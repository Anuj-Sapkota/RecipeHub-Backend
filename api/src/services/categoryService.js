import categoryModel from "../models/Category.js";

const createCategory = async (id, data) => {
  // Check using the getById function with is to be made.
  const createdCategory = await categoryModel.create(data);
  return createdCategory;
};

export default {
  createCategory,
};
