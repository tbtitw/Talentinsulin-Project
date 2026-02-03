const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware для проверки авторизации
const auth = require('../middleware/auth');

// Генерация курса с помощью OpenAI
router.post('/generate', auth, async (req, res) => {
  try {
    const { language, level, numberOfLessons = 10 } = req.body;

    if (!language || !level) {
      return res.status(400).json({ message: 'Language and level are required' });
    }

    // Генерируем план курса с помощью OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert language teacher creating structured language courses. Create a comprehensive course with 15-minute lessons."
        },
        {
          role: "user",
          content: `Create a ${level} level ${language} language course with ${numberOfLessons} lessons. Each lesson should be designed for 15 minutes. Return a JSON object with this structure:
{
  "title": "Course title",
  "description": "Course description",
  "lessons": [
    {
      "title": "Lesson title",
      "content": "Lesson content with explanations",
      "vocabulary": [
        {"word": "word", "translation": "translation", "example": "example sentence"}
      ],
      "exercises": [
        {
          "type": "multiple-choice",
          "question": "Question text",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": "option1"
        }
      ]
    }
  ]
}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    const courseData = JSON.parse(completion.choices[0].message.content);

    // Создаем курс в базе данных
    const course = new Course({
      title: courseData.title,
      language,
      level,
      description: courseData.description,
      userId: req.user.id,
      duration: 15
    });

    await course.save();

    // Создаем уроки
    const lessons = [];
    for (let i = 0; i < courseData.lessons.length; i++) {
      const lessonData = courseData.lessons[i];
      const lesson = new Lesson({
        courseId: course._id,
        title: lessonData.title,
        content: lessonData.content,
        vocabulary: lessonData.vocabulary,
        exercises: lessonData.exercises,
        duration: 15,
        order: i + 1
      });
      await lesson.save();
      lessons.push(lesson._id);
    }

    // Обновляем курс с ID уроков
    course.lessons = lessons;
    await course.save();

    res.status(201).json({
      message: 'Course generated successfully',
      course: {
        ...course.toObject(),
        lessonCount: lessons.length
      }
    });

  } catch (error) {
    console.error('Error generating course:', error);
    res.status(500).json({ message: 'Error generating course', error: error.message });
  }
});

// Получить все публичные курсы
router.get('/all', async (req, res) => {
  try {
    const { language, level } = req.query;
    const filter = { isPublic: true };
    
    if (language) filter.language = language;
    if (level) filter.level = level;

    const courses = await Course.find(filter)
      .sort({ enrolledStudents: -1, createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Получить все курсы пользователя
router.get('/my-courses', auth, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.user.id })
      .populate('lessons')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Получить конкретный курс
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('lessons');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Error fetching course' });
  }
});

// Получить урок
router.get('/:courseId/lessons/:lessonId', auth, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // Проверяем, что курс принадлежит пользователю
    const course = await Course.findOne({
      _id: courseId,
      userId: req.user.id
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lesson = await Lesson.findOne({
      _id: lessonId,
      courseId: courseId
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ message: 'Error fetching lesson' });
  }
});

// Отметить урок как завершенный
router.put('/:courseId/lessons/:lessonId/complete', auth, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // Проверяем, что курс принадлежит пользователю
    const course = await Course.findOne({
      _id: courseId,
      userId: req.user.id
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lesson = await Lesson.findOneAndUpdate(
      { _id: lessonId, courseId: courseId },
      { completed: true },
      { new: true }
    );

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ message: 'Lesson marked as completed', lesson });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ message: 'Error updating lesson' });
  }
});

// Купить курс
router.post('/:id/purchase', auth, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Получаем курс
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.isPublic) {
      return res.status(400).json({ message: 'This course is not available for purchase' });
    }

    // Получаем пользователя
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Проверяем, не куплен ли уже курс
    const alreadyPurchased = user.purchasedCourses.some(
      pc => pc.courseId.toString() === courseId
    );
    if (alreadyPurchased) {
      return res.status(400).json({ message: 'You have already purchased this course' });
    }

    // Проверяем баланс токенов
    if (user.tokens < course.price) {
      return res.status(400).json({ 
        message: `Insufficient tokens. You need ${course.price} tokens but have ${user.tokens}` 
      });
    }

    // Списываем токены
    user.tokens -= course.price;
    
    // Добавляем курс в купленные
    user.purchasedCourses.push({
      courseId: courseId,
      tokensPaid: course.price,
      purchasedAt: new Date()
    });

    await user.save();

    // Увеличиваем счетчик записанных студентов в курсе
    course.enrolledStudents += 1;
    await course.save();

    // Создаем транзакцию
    const transaction = new Transaction({
      userId: userId,
      type: 'course_purchase',
      amount: course.price,
      tokensChange: -course.price,
      description: `Purchased course: ${course.title}`,
      courseId: courseId
    });
    await transaction.save();

    res.json({ 
      message: 'Course purchased successfully',
      remainingTokens: user.tokens,
      course: course
    });
  } catch (error) {
    console.error('Error purchasing course:', error);
    res.status(500).json({ message: 'Error purchasing course', error: error.message });
  }
});

// Удалить курс
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Удаляем все уроки курса
    await Lesson.deleteMany({ courseId: course._id });

    // Удаляем курс
    await Course.deleteOne({ _id: course._id });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Error deleting course' });
  }
});

module.exports = router;
