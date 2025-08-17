import RecipeModel from "../models/Recipe.js";

const create = async (data, createdBy) => {
  const createdRecipe = await RecipeModel.create({
    ...data,
    createdBy,
  });
  return createdRecipe;
};

export default { create };
