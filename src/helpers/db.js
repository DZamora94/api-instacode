const mongoose = require('mongoose');
require('dotenv').config();

const urlDB = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(urlDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const { name, host } = db.connection;
    console.log(`Conectando a: ${name} ${host}`);
  } catch (error) {
    console.error('Error de conecxion a la DB');
  }
};

module.exports = { connectDB };
