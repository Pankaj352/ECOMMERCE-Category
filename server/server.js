import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import seedCategories from "./utils/seedCategories.js";
import categoryRouter from "./routes/category.route.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/categories", categoryRouter);

const startServer = async () => {
  try {
    await connectDB();
    await seedCategories();
    console.log("Seeding completed, starting server...");

    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};


startServer();
