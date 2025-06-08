import express from "express";
import {
  getCategoriesWithPagination,
  saveSelectedCategories,
  getUserSelectedCategories,
} from "../controllers/Category.controller.js";

const router = express.Router();

router.get("/", getCategoriesWithPagination);
router.post("/select", saveSelectedCategories);
router.get("/user/:userId", getUserSelectedCategories);
export default router;
