import categoryService from "../services/categoryService.js";

const createCategory = async (req, res) => {
  const input = req.body;

  try {
    const data = await categoryService.createCategory(
      req.params.id,
      req.file,
      input
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// new: get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error?.message ?? error });
  }
};

// new: get category by id
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error?.message ?? error });
  }
};

export default { createCategory, getAllCategories, getCategoryById };
