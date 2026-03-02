const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connect MongoDB success');
  } catch (error) {
    console.log('❌ Connect error:', error);
  }
}

module.exports = { connect };