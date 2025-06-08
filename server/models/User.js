import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    selectedCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ],
    otp: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
