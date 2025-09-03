
const createCategory = async (file, data) => {
  // if category with the same name exists, throw an error
  const categoryExists = await categoryModel.findOne({ name: data.name });
  if (categoryExists) {
    throw new Error("Category already exists!");
  }

  let uploadedImage = "";

  if (file) {
    const rawFileName = data.name;
    // random string for uniqueness in filename
    const randomStr = Math.random().toString(36).substring(2, 7);
    //filename generation
    const filename = (
      rawFileName.replace(/\s+/g, "-") +
      "-" +
      randomStr
    ).toLowerCase();
    uploadedImage = await uploadFile(file, filename);
  }

  // Check using the getById function with is to be made.
  const createdCategory = await categoryModel.create({
    ...data,
    image: uploadedImage
      ? { url: uploadedImage.secure_url, public_id: uploadedImage.public_id }
      : { url: "", public_id: "" },
  });

  return createdCategory;
};

const getAllCategories = async () => {
  const categories = await categoryModel.find().sort({ createdAt: -1 }).lean();

  if (categories.length === 0) {
    throw new Error("No categories found");
  }

  return categories;
};

const getCategoryById = async (id) => {
  const category = await categoryModel.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

//update category
export const updateCategory = async (id, file, data) => {
  const category = await getCategoryById(id);

  let uploadedImage = "";

  if (file) {
    //delete the old image from cloudinary
    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }
    //taking the name from the name
    const rawFileName = data.name ?? category.name;
    // random string for uniqueness in filename
    const randomStr = Math.random().toString(36).substring(2, 7); // 5 chars
    const filename = (
      rawFileName.replace(/\s+/g, "-") +
      "-" +
      randomStr
    ).toLowerCase();
    uploadedImage = await uploadImages(file, filename);
  }

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    id,
    {
      ...data,
      image: uploadedImage
        ? { url: uploadedImage.secure_url, public_id: uploadedImage.public_id }
        : { url: "", public_id: "" },
    },
    { new: true }
  );

  return updatedCategory;
};

//delete category
export const deleteCategory = async (id) => {
  const category = await getCategoryById(id);

  //delete image from cloudinary id exists
  if (category.image?.public_id) {
    await cloudinary.uploader.destroy(category.image.public_id);
  }

  const deletedCategory = await categoryModel.findByIdAndDelete(id);

  return deletedCategory;
};

// get category by name
export const getByName = async (name) => {
  const category = await categoryModel.find({
    name: { $regex: `^${name}`, $options: "i" },
  });

  if (category.length === 0) {
    throw new Error("No categories found");
  }

  return category;
};
export default {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getByName,
};
