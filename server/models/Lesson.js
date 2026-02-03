const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  vocabulary: [{
    word: String,
    translation: String,
    example: String
  }],
  exercises: [{
    type: {
      type: String,
      enum: ['multiple-choice', 'fill-in-blank', 'translation'],
      required: true
    },
    question: String,
    options: [String],
    correctAnswer: String
  }],
  duration: {
    type: Number, // in minutes
    default: 15
  },
  order: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', lessonSchema);
