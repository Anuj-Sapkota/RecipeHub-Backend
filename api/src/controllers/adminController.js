import adminService from "../services/adminService.js";
import userService from "../services/userService.js";

const getStats = async (req, res) => {
  try {
    const data = await adminService.getStats();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get recipes
const getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const data = await adminService.getAllRecipes(page, limit);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//get the user info
const getUserData = async (req, res) => {
  try {
    const user = req.params.id;

    const data = await userService.getMe(user);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export default { getStats, getAllRecipes, getUserData };
