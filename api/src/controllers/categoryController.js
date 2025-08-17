import Category from "../models/Category.js";

// Create a new category (admin only)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Category name is required" });

    // Check for duplicate category
    const exists = await Category.findOne({ name });
    if (exists) return res.status(409).json({ error: "Category already exists" });

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};