import { faker } from "@faker-js/faker";
import Category from "../models/Category.js";

const seedCategories = async () => {
  try {
    console.log("Checking existing categories...");

    const count = await Category.countDocuments();

    if (count > 0) {
      console.log("Categories already created.");
      return;
    }

    console.log("Creating 100 categories...");

    const categoriesSet = new Set();
    let attempts = 0;
    const maxAttempts = 1000;

    while (categoriesSet.size < 100 && attempts < maxAttempts) {
      const category = faker.commerce.department();
      const extra = faker.commerce.productAdjective();
      const combined = `${category} ${extra}`;
      if (combined && combined.trim() !== "") {
        categoriesSet.add(combined);
      }
      attempts++;
    }

    if (categoriesSet.size < 100) {
      console.warn(
        `Only generated ${categoriesSet.size} unique categories after ${maxAttempts} attempts.`
      );
    }

    const categories = [...categoriesSet].map((name) => ({ name }));

    console.log("Before inserting categories...");
    await Category.insertMany(categories);
    console.log("Categories created successfully.");
  } catch (error) {
    console.error("Failed to create categories:", error);
  }
};

export default seedCategories;
