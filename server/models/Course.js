const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  language: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 15
  },
  price: {
    type: Number, // price in tokens
    required: true,
    default: 100
  },
  teacher: {
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: '👨‍🏫'
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    students: {
      type: Number,
      default: 0
    }
  },
  thumbnail: {
    type: String,
    default: ''
  },
  totalLessons: {
    type: Number,
    default: 10
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
