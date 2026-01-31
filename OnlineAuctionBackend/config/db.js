const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    console.warn('Continuing without DB connection — server will run but DB-backed routes may fail.');
  }
};

module.exports = connectDB;