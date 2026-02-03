const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Top-up', 'Service Payment', 'Refund', 'Course Purchase', 'course_purchase'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tokens: {
    type: Number
  },
  tokensChange: {
    type: Number
  },
  status: {
    type: String,
    enum: ['Successful', 'Pending', 'Failed', 'Completed'],
    default: 'Completed'
  },
  details: {
    type: String
  },
  description: {
    type: String
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  packageType: {
    type: String,
    enum: ['Starter', 'Pro', 'Premium', 'Custom']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
