import recipeService from "../services/recipeService.js";

// create recipe
const createRecipe = async (req, res) => {
  const input = req.body;

  try {
    const data = await recipeService.create(input, req.file, req.user);

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

// Get all recipes
const getAll = async (req, res) => {
  try {
    const recipes = await recipeService.getAll();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get recipe by ID
const getById = async (req, res) => {
  try {
    const recipe = await recipeService.getById(req.params.id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get recipes by user
const getByUser = async (req, res) => {
  try {
    const recipes = await recipeService.getByUser(req.params.userId);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get recipes by title
const getByRecipeTitle = async (req, res) => {
  try {
    const recipes = await recipeService.getByRecipeTitle(req.params.title);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export default { createRecipe, getAll, getById, getByUser, getByRecipeTitle };