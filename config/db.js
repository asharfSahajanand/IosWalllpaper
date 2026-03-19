import mongoose from "mongoose";

const connectDB = async () => {
  console.log("url",process.env.MONGODB_URI)
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("DB Connection Failed ❌", error.message);
    process.exit(1);
  }
};

export default connectDB;