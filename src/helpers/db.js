const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const { name, host } = db.connection;
    console.log(`Connecting to: ${name} ${host}`);
  } catch (error) {
    console.error('Error connecting to DB');
  }
};

module.exports = { connectDB };
