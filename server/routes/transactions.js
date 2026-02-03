const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Получить все транзакции пользователя
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .populate('courseId', 'title')
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Получить транзакцию по ID
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('courseId', 'title');
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Покупка токенов (Top-up)
router.post('/buy-tokens', auth, async (req, res) => {
  try {
    const { packageType, tokens, amount } = req.body;
    
    console.log('Buy tokens request:', { packageType, tokens, amount, userId: req.user._id });
    
    // Создать транзакцию
    const transaction = new Transaction({
      userId: req.user._id,
      type: 'Top-up',
      amount,
      tokens,
      status: 'Successful',
      details: `Purchased Package ${packageType}`,
      packageType
    });
    
    await transaction.save();
    
    // Обновить баланс токенов пользователя
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { tokens: tokens }
    });
    
    res.json({ 
      message: 'Tokens purchased successfully', 
      transaction 
    });
  } catch (error) {
    console.error('Buy tokens error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Покупка курса за токены
router.post('/buy-course', auth, async (req, res) => {
  try {
    const { courseId, tokensRequired, courseTitle } = req.body;
    
    const user = await User.findById(req.user._id);
    
    // Проверить достаточно ли токенов
    if (user.tokens < tokensRequired) {
      return res.status(400).json({ message: 'Insufficient tokens' });
    }
    
    // Проверить, не куплен ли уже курс
    const alreadyPurchased = user.purchasedCourses.some(
      course => course.courseId.toString() === courseId
    );
    
    if (alreadyPurchased) {
      return res.status(400).json({ message: 'Course already purchased' });
    }
    
    // Создать транзакцию
    const transaction = new Transaction({
      userId: req.user._id,
      type: 'Course Purchase',
      amount: 0,
      tokens: -tokensRequired,
      status: 'Successful',
      details: courseTitle,
      courseId
    });
    
    await transaction.save();
    
    // Обновить пользователя: вычесть токены и добавить курс
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { tokens: -tokensRequired },
      $push: { 
        purchasedCourses: { 
          courseId, 
          tokensPaid: tokensRequired 
        } 
      }
    });
    
    res.json({ 
      message: 'Course purchased successfully', 
      transaction 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Возврат токенов (Refund)
router.post('/refund', auth, async (req, res) => {
  try {
    const { courseId, tokens, reason } = req.body;
    
    // Создать транзакцию возврата
    const transaction = new Transaction({
      userId: req.user._id,
      type: 'Refund',
      amount: 0,
      tokens,
      status: 'Completed',
      details: reason || 'Course Refund',
      courseId
    });
    
    await transaction.save();
    
    // Вернуть токены и удалить курс из купленных
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { tokens: tokens },
      $pull: { purchasedCourses: { courseId } }
    });
    
    res.json({ 
      message: 'Refund processed successfully', 
      transaction 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
