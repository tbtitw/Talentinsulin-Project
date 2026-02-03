// Скрипт для добавления полей tokens и purchasedCourses существующим пользователям
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project7')
  .then(async () => {
    console.log('MongoDB connected');
    
    // Обновить всех пользователей без поля tokens
    const result = await User.updateMany(
      { tokens: { $exists: false } },
      { 
        $set: { 
          tokens: 0,
          purchasedCourses: []
        } 
      }
    );
    
    console.log(`Updated ${result.modifiedCount} users`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
