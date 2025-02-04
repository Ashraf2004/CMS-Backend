const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,  // Wait 5 seconds before failing
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


// const mongoose = require("mongoose");
// require("dotenv").config();

// console.log(process.env.MONGO_URI);

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("✅ MongoDB Connected Successfully");
//     } catch (error) {
//         console.error("❌ MongoDB Connection Failed:", error);
//     }
// };

// module.exports = connectDB;
