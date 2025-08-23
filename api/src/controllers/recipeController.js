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

//update recipe controller
const updateRecipe = async (req, res) => {
  const input = req.body;
  const recipeId = req.params.id;
  const file = req.file;
  const user = req.user;
  try {
    const data = await recipeService.update(input, file, user, recipeId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { createRecipe, updateRecipe };
