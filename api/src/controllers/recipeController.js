import recipeService from "../services/recipeService.js";

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

export default { createRecipe };
