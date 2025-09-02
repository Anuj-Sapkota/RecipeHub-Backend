import categoryModel from "../models/Category.js";

export const create = async (id, data) => {
  // Check using the getById function with is to be made.
  const createdCategory = await categoryModel.create(data);

  return createdCategory;
};

//update category
export const update = async (id, data) => {
  const updatedCategory = await categoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedCategory;
};

//delete category
export const deleteCat = async (id, deletedBy) => {
  const deletedCategory = await categoryModel.findByIdAndDelete(id, {
    new: true,
  });
  return deletedCategory;
};

//get category by id
export const getById = async (id) => {
  const extractedCategory = await categoryModel.findById(id);
  return extractedCategory;
};

// get category by name
export const getByName = async (title) => {
  const categoryName = await categoryModel.find({
    title: { $regex: title, $options: "i" },
  });
  return categoryName;
};