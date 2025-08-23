import recipeService from "../services/recipeService.js";

const createRecipe = async (req, res) => {

  try {
    const data = await recipeService.create(req.body, req.file, req.user);

    res.status(201).json(data);
  } catch (error) {

    // Handling duplicate recipe title for the same user
    if (error.code === 11000) {
      return res.status(400).send("You already have a recipe with that title!");
    } else {
      res.status(500).send(error.message);
    }
  }
  
};

// // get recipe by id
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getById(id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAll();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get recipe by name
const getRecipeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const recipe = await recipeService.getByName(name);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get recipes by user
const getRecipesByUser = async (req, res) => {
  try {
    const recipes = await recipeService.getByUser(req.user._id);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// enable rating for a recipe
const rateRecipe = async (req, res) => {
  try {
    const { id } = req.params; // recipe id
    const { rating } = req.body; // rating value
    const userId = req.user._id; // user id

    const updatedRecipe = await recipeService.rateRecipe(id, rating, userId);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
    createRecipe,
    rateRecipe,
    getAllRecipes,
    getRecipeById,
    getRecipesByUser,
    getRecipeByName
};