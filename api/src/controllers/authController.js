import authService from "../services/authService.js";

const registerUser = async (req, res) => {
  try {
    const input = req.body;
    const registeredUser = await authService.register(input);
    res.status(201).json(registeredUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
   try {
     const input = req.body;
    const loggedUser = await authService.login(input);
    res.status(200).json(loggedUser);
   } catch (error) {
    res.status(500).send(error.message);
   }
}


export default {registerUser, loginUser}