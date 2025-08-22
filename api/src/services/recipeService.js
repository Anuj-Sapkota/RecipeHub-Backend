import categoryModel from "../models/Category.js";
import RecipeModel from "../models/Recipe.js";
import uploadImages from "../utils/file.js";
import { promptMessage } from "../constants/promptMessage.js";
import geminiReply from "../utils/gemini.js";

const create = async (data, file, createdBy) => {
  // generating a filename based on the recipe title
  const rawFileName = data.title;
  // random string for uniqueness in filename
  const randomStr = Math.random().toString(36).substring(2, 7); // 5 chars
  const filename = (rawFileName.replace(/\s+/g, '-') + '-' + randomStr).toLowerCase();
  //checking if the category exists or not
  const categoryExists = await categoryModel.findById(data.category);

  if (!categoryExists) {
    throw new Error("Category not found");
  }

  const promptNutrients = promptMessage.PROMPT_RECIPE_NUTRIENTS;
  const promptDescription = promptMessage.PROMPT_RECIPE_DESCRIPTION;

//  replacing placeholders in the prompt messages
  const nutrientsPrompt = promptNutrients.replace("$s", data.title)
    .replace("$s", data.description)
    .replace("$s", data.preparationTime)
    .replace("$s", data.servings)
    .replace("$s", data.ingredients)
    .replace("$s", data.instructions)
    .replace("$s", categoryExists.name);

  // replacing placeholders in the description prompt
  const descriptionPrompt = promptDescription
    .replace("$s", data.title)
    .replace("$s", data.preparationTime)
    .replace("$s", data.servings)
    .replace("$s", data.ingredients)
    .replace("$s", data.instructions)
    .replace("$s", categoryExists.name);
    
  // getting nutrients from Gemini AI and uploading the image to cloudinary
 const [uploadedImage, nutrientsResponse, descriptionResponse] = await Promise.all([
    uploadImages(file, filename),
    geminiReply(nutrientsPrompt),
    geminiReply(descriptionPrompt),
  ]);

  const createdRecipe = await RecipeModel.create({
    ...data,
    createdBy: createdBy._id,
   image: uploadedImage.secure_url,
   nutrients: data.nutrients ?? nutrientsResponse.split("\n").map(item => item.trim()).filter(item => item),
   description: data.description ?? descriptionResponse,
  });

  return createdRecipe;
};

export default { create };
