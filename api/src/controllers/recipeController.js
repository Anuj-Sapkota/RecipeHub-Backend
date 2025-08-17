import recipeService from "../services/recipeService.js";

const createRecipe = async (req, res) => {
  try {
    const data = await recipeService.create(req.body, req.user);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { createRecipe };
