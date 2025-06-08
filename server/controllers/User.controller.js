import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.JWT_KEY;
const time = process.env.EXPIRATION_TIME;
// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ status: 401, message: "All fields are required!" });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res
        .status(409)
        .json({ status: 409, message: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(10000000 + Math.random() * 90000000); // 8-digit OTP

    const data = await User.create({
      name,
      email,
      password: hashPassword,
      otp,
    });

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ status: 401, message: "All fields are required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized access!" });
    }
const payload = { email }; // or { email: email }
const options = { expiresIn: time };

const token = jwt.sign(payload, key, options);
    const object = { user, token };
    return res
      .status(200)
      .json({ status: 200, message: "Login successful", object });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

//verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: "User ID and OTP required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare as strings
    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // After OTP verified - clear OTP field
    user.otp = null;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ otp: user.otp }); // only send otp for demo/testing
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server error", error });
  }
};