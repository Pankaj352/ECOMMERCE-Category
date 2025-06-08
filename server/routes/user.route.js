import express from "express";
import {
  signup,
  login,
  verifyOtp,
  getUserById,
} from "../controllers/User.controller.js";
// import auth from "../utils/auth.js"
const router = express.Router();

// Signup and Login
router.post("/register", signup);
router.post("/login", login);
router.post("/verify-otp",  verifyOtp);
router.get("/:id", getUserById);

export default router;
