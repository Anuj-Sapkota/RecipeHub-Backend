import userModel from "../models/User.js";

const register = async (data) => {
  const userData = userModel.create(data);
  return userData;
};

const login = async (data) => {
  const userData = await userModel.findOne({ email: data.email });
  const userObj = userData.toObject();
  delete userObj.password;
  return userObj;
};

export default { register, login };
