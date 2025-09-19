import userService from "../services/userService.js";

const updateUser = async (req, res) => {
  try {
    const currUserId = req.user._id;
    const input = req.body;
    const userId = req.params.id;
    const file = req.file;
    const data = await userService.update(userId, currUserId, input, file);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//delete user
const deleteUser = async (req, res) => {
  try {
    const currUser = req.user;
    const userId = req.params.id;
    await userService.remove(userId, currUser);

    res.status(201).send("User Successfully Removed!");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
// get the logged in user
const getCurrentUser = async (req, res) => {
  try {
    const currUser = req.user._id;
    const data = await userService.getMe(currUser);

    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default { updateUser, deleteUser, getCurrentUser };
