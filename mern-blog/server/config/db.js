const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
     console.log('✅ Success!! Connected to MongoDB Compass');
  } catch (error) {
    console.error(`❌ Sorry!! MongoDB connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;