import Category from "../models/Category.js";
import User from "../models/User.js";
export const getCategoriesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Category.countDocuments();
    const categories = await Category.find().skip(skip).limit(limit);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      categories,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server Error", error });
  }
};



export const saveSelectedCategories = async (req, res) => {
  try {
    const { userId, selectedCategoryIds } = req.body;

    if (!userId || !Array.isArray(selectedCategoryIds)) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { selectedCategories: selectedCategoryIds },
      { new: true }
    ).populate("selectedCategories");

    res.status(200).json({ message: "Categories saved", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const getUserSelectedCategories = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("selectedCategories");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ selectedCategories: user.selectedCategories || [] });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
