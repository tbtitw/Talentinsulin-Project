const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const courses = [
  {
    title: 'Spanish for Beginners',
    language: 'Spanish',
    level: 'beginner',
    description: 'Start your Spanish journey with basic vocabulary, grammar, and conversational phrases. Perfect for complete beginners.',
    duration: 20,
    price: 150,
    teacher: {
      name: 'Maria Garcia',
      bio: 'Native Spanish teacher with 10+ years of experience. Specializes in conversational Spanish.',
      avatar: '👩‍🏫',
      rating: 4.9,
      students: 1250
    },
    thumbnail: '🇪🇸',
    totalLessons: 15,
    enrolledStudents: 1250,
    isPublic: true
  },
  {
    title: 'Advanced Spanish Conversation',
    language: 'Spanish',
    level: 'advanced',
    description: 'Master advanced Spanish through immersive conversation practice, idioms, and complex grammar structures.',
    duration: 25,
    price: 250,
    teacher: {
      name: 'Carlos Rodriguez',
      bio: 'Experienced language instructor from Madrid. Expert in advanced Spanish literature and culture.',
      avatar: '👨‍🏫',
      rating: 4.8,
      students: 890
    },
    thumbnail: '🇪🇸',
    totalLessons: 20,
    enrolledStudents: 890,
    isPublic: true
  },
  {
    title: 'French Fundamentals',
    language: 'French',
    level: 'beginner',
    description: 'Learn French basics including pronunciation, essential vocabulary, and simple conversations.',
    duration: 18,
    price: 150,
    teacher: {
      name: 'Sophie Dubois',
      bio: 'Parisian native with a passion for teaching French language and culture.',
      avatar: '👩‍🏫',
      rating: 4.9,
      students: 1180
    },
    thumbnail: '🇫🇷',
    totalLessons: 15,
    enrolledStudents: 1180,
    isPublic: true
  },
  {
    title: 'Business French',
    language: 'French',
    level: 'intermediate',
    description: 'Professional French for business settings, meetings, presentations, and negotiations.',
    duration: 22,
    price: 200,
    teacher: {
      name: 'Pierre Martin',
      bio: 'Business French specialist with corporate training experience.',
      avatar: '👨‍💼',
      rating: 4.7,
      students: 680
    },
    thumbnail: '🇫🇷',
    totalLessons: 18,
    enrolledStudents: 680,
    isPublic: true
  },
  {
    title: 'German for Travelers',
    language: 'German',
    level: 'beginner',
    description: 'Essential German phrases and vocabulary for traveling in German-speaking countries.',
    duration: 15,
    price: 120,
    teacher: {
      name: 'Hans Schmidt',
      bio: 'Berlin-based teacher specializing in practical German for everyday situations.',
      avatar: '👨‍🏫',
      rating: 4.8,
      students: 950
    },
    thumbnail: '🇩🇪',
    totalLessons: 12,
    enrolledStudents: 950,
    isPublic: true
  },
  {
    title: 'Advanced German Grammar',
    language: 'German',
    level: 'advanced',
    description: 'Deep dive into complex German grammar, cases, and sentence structures.',
    duration: 25,
    price: 250,
    teacher: {
      name: 'Greta Müller',
      bio: 'PhD in Germanic Linguistics with 15 years of teaching experience.',
      avatar: '👩‍🎓',
      rating: 4.9,
      students: 720
    },
    thumbnail: '🇩🇪',
    totalLessons: 20,
    enrolledStudents: 720,
    isPublic: true
  },
  {
    title: 'Japanese Hiragana & Katakana',
    language: 'Japanese',
    level: 'beginner',
    description: 'Master Japanese writing systems and basic vocabulary. Perfect starting point for Japanese learners.',
    duration: 20,
    price: 180,
    teacher: {
      name: 'Yuki Tanaka',
      bio: 'Native Japanese teacher from Tokyo. Expert in teaching Japanese writing systems.',
      avatar: '👩‍🏫',
      rating: 4.9,
      students: 1420
    },
    thumbnail: '🇯🇵',
    totalLessons: 16,
    enrolledStudents: 1420,
    isPublic: true
  },
  {
    title: 'Japanese Business Communication',
    language: 'Japanese',
    level: 'intermediate',
    description: 'Professional Japanese for business contexts including keigo (honorific language).',
    duration: 24,
    price: 220,
    teacher: {
      name: 'Kenji Yamamoto',
      bio: 'Former corporate trainer with expertise in Japanese business culture.',
      avatar: '👨‍💼',
      rating: 4.8,
      students: 580
    },
    thumbnail: '🇯🇵',
    totalLessons: 18,
    enrolledStudents: 580,
    isPublic: true
  },
  {
    title: 'Italian Conversation Practice',
    language: 'Italian',
    level: 'intermediate',
    description: 'Improve your Italian through engaging conversations about culture, food, and daily life.',
    duration: 20,
    price: 180,
    teacher: {
      name: 'Giulia Rossi',
      bio: 'Italian teacher from Rome. Passionate about Italian culture and conversation.',
      avatar: '👩‍🏫',
      rating: 4.8,
      students: 840
    },
    thumbnail: '🇮🇹',
    totalLessons: 15,
    enrolledStudents: 840,
    isPublic: true
  },
  {
    title: 'Italian for Beginners',
    language: 'Italian',
    level: 'beginner',
    description: 'Start learning Italian with basic grammar, pronunciation, and everyday vocabulary.',
    duration: 18,
    price: 150,
    teacher: {
      name: 'Marco Bianchi',
      bio: 'Experienced Italian teacher with a focus on practical communication.',
      avatar: '👨‍🏫',
      rating: 4.7,
      students: 1050
    },
    thumbnail: '🇮🇹',
    totalLessons: 14,
    enrolledStudents: 1050,
    isPublic: true
  },
  {
    title: 'Mandarin Chinese Basics',
    language: 'Chinese',
    level: 'beginner',
    description: 'Introduction to Mandarin Chinese including pinyin, tones, and basic characters.',
    duration: 22,
    price: 180,
    teacher: {
      name: 'Li Wei',
      bio: 'Beijing native with expertise in teaching Mandarin to international students.',
      avatar: '👨‍🏫',
      rating: 4.9,
      students: 1320
    },
    thumbnail: '🇨🇳',
    totalLessons: 16,
    enrolledStudents: 1320,
    isPublic: true
  },
  {
    title: 'Chinese Characters Mastery',
    language: 'Chinese',
    level: 'intermediate',
    description: 'Learn to read and write Chinese characters with proper stroke order and meaning.',
    duration: 25,
    price: 220,
    teacher: {
      name: 'Zhang Mei',
      bio: 'Calligraphy expert and Chinese language teacher with 12 years experience.',
      avatar: '👩‍🎓',
      rating: 4.8,
      students: 670
    },
    thumbnail: '🇨🇳',
    totalLessons: 20,
    enrolledStudents: 670,
    isPublic: true
  },
  {
    title: 'Portuguese for Beginners',
    language: 'Portuguese',
    level: 'beginner',
    description: 'Learn Brazilian Portuguese basics including pronunciation, grammar, and common phrases.',
    duration: 18,
    price: 150,
    teacher: {
      name: 'Ana Silva',
      bio: 'Brazilian Portuguese teacher from São Paulo. Expert in conversational Portuguese.',
      avatar: '👩‍🏫',
      rating: 4.8,
      students: 920
    },
    thumbnail: '🇵🇹',
    totalLessons: 14,
    enrolledStudents: 920,
    isPublic: true
  },
  {
    title: 'Portuguese Conversation',
    language: 'Portuguese',
    level: 'intermediate',
    description: 'Practice Portuguese conversation skills with focus on Brazilian culture and expressions.',
    duration: 20,
    price: 180,
    teacher: {
      name: 'João Santos',
      bio: 'Portuguese teacher specializing in conversational fluency and cultural immersion.',
      avatar: '👨‍🏫',
      rating: 4.7,
      students: 650
    },
    thumbnail: '🇵🇹',
    totalLessons: 16,
    enrolledStudents: 650,
    isPublic: true
  },
  {
    title: 'Russian Alphabet & Basics',
    language: 'Russian',
    level: 'beginner',
    description: 'Master the Cyrillic alphabet and basic Russian grammar and vocabulary.',
    duration: 20,
    price: 170,
    teacher: {
      name: 'Olga Petrova',
      bio: 'Native Russian teacher from Moscow with 8 years of teaching experience.',
      avatar: '👩‍🏫',
      rating: 4.8,
      students: 780
    },
    thumbnail: '🇷🇺',
    totalLessons: 15,
    enrolledStudents: 780,
    isPublic: true
  },
  {
    title: 'Advanced Russian Literature',
    language: 'Russian',
    level: 'advanced',
    description: 'Explore Russian literature while advancing your language skills through classic texts.',
    duration: 28,
    price: 280,
    teacher: {
      name: 'Dmitri Ivanov',
      bio: 'PhD in Russian Literature with passion for teaching language through literature.',
      avatar: '👨‍🎓',
      rating: 4.9,
      students: 420
    },
    thumbnail: '🇷🇺',
    totalLessons: 22,
    enrolledStudents: 420,
    isPublic: true
  },
  {
    title: 'Korean for K-Pop Fans',
    language: 'Korean',
    level: 'beginner',
    description: 'Learn Korean through K-pop lyrics, Korean culture, and modern expressions.',
    duration: 20,
    price: 160,
    teacher: {
      name: 'Kim Min-ji',
      bio: 'Seoul native who loves teaching Korean through popular culture.',
      avatar: '👩‍🏫',
      rating: 4.9,
      students: 1580
    },
    thumbnail: '🇰🇷',
    totalLessons: 15,
    enrolledStudents: 1580,
    isPublic: true
  },
  {
    title: 'Business Korean',
    language: 'Korean',
    level: 'intermediate',
    description: 'Professional Korean for business meetings, emails, and workplace communication.',
    duration: 24,
    price: 220,
    teacher: {
      name: 'Park Seung-ho',
      bio: 'Korean business language expert with corporate training background.',
      avatar: '👨‍💼',
      rating: 4.7,
      students: 540
    },
    thumbnail: '🇰🇷',
    totalLessons: 18,
    enrolledStudents: 540,
    isPublic: true
  },
  {
    title: 'Arabic for Beginners',
    language: 'Arabic',
    level: 'beginner',
    description: 'Introduction to Modern Standard Arabic including alphabet, pronunciation, and basic phrases.',
    duration: 22,
    price: 180,
    teacher: {
      name: 'Fatima Al-Hassan',
      bio: 'Arabic teacher from Cairo with expertise in teaching Arabic to foreigners.',
      avatar: '👩‍🏫',
      rating: 4.8,
      students: 890
    },
    thumbnail: '🇸🇦',
    totalLessons: 16,
    enrolledStudents: 890,
    isPublic: true
  },
  {
    title: 'Dutch Essentials',
    language: 'Dutch',
    level: 'beginner',
    description: 'Learn Dutch basics including pronunciation, grammar, and everyday conversations.',
    duration: 18,
    price: 150,
    teacher: {
      name: 'Jan de Vries',
      bio: 'Amsterdam-based Dutch teacher with focus on practical language skills.',
      avatar: '👨‍🏫',
      rating: 4.7,
      students: 620
    },
    thumbnail: '🇳🇱',
    totalLessons: 14,
    enrolledStudents: 620,
    isPublic: true
  }
];

async function seedCourses() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/talentinsulin');
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({ isPublic: true });
    console.log('Cleared existing public courses');

    // Insert new courses
    const result = await Course.insertMany(courses);
    console.log(`Successfully added ${result.length} courses`);

    // Display summary
    console.log('\nCourses by language:');
    const languages = {};
    result.forEach(course => {
      if (!languages[course.language]) {
        languages[course.language] = 0;
      }
      languages[course.language]++;
    });
    
    Object.keys(languages).forEach(lang => {
      console.log(`${lang}: ${languages[lang]} courses`);
    });

    console.log('\nPrice range:', 
      Math.min(...result.map(c => c.price)), 
      '-', 
      Math.max(...result.map(c => c.price)), 
      'tokens'
    );

    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();
