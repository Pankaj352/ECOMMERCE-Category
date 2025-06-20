import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("database connected successfully...");
  } catch (error) {
    console.error("database connection failed:", error.message);
  }
};
