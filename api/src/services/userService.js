import userModel from "../models/User.js";
import uploadFile from "../utils/file.js";
import cloudinary from "cloudinary";

//fields that must not be updated using the update function
const forbiddenFields = ["password", "role", "createdBy", "email"];

const update = async (userId, currUserId, data, file) => {
  const user = await userModel.findById(userId);

  if (!user) {
   throw({
          message: "User does not exists!",
          statusCode: 404
        });
  }

  if (userId != currUserId) {
    throw({
          message: "Unauthorized!",
          statusCode: 403
        });
  }

  for (let field of forbiddenFields) {
    if (field in data) {
      throw(
      {
          message: `Cannot Update ${field}`,
          statusCode: 403
        }
    );
  }
  }
  //to update the profile pic
  let profileImage = "";

  if (file) {
    //delete file from cloudinary if exists
    if (user.profileImage?.public_id) {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    }
    //filename as userId;
    const filename = user._id.toString();
    profileImage = await uploadFile(file, filename);
  }
  const updatedData = await userModel
    .findByIdAndUpdate(
      userId,

      {
        fullName: data.fullName,
        profileImage: profileImage
          ? {url: profileImage.secure_url, public_id: profileImage.public_id}
          : user.profileImage,
        bio: data.bio ?? user.bio,
      },
      { new: true }
    )
    .select("-password");

  return updatedData;
};

//delete the user
const remove = async(userId, currUser) => {
    const user = await userModel.findById(userId);
    console.log(currUser.role)
    //check if the user is authorized or not
    if ((user._id.toString() != (currUser._id) && !currUser.role.includes("ADMIN")))
    {
        throw({
          message: "Unauthorized!",
          statusCode: 403
        });
    }

    if (!user) {
        throw({
          message: "User does not exists!",
          statusCode: 404
        });
    }
  
   if (user.profileImage?.public_id) {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
      console.log("Deleted")
    }

    await userModel.findByIdAndDelete(userId);

}

// get the current user data
const getMe = async(currUser) => {
  const user = await userModel.findById(currUser._id).select("-password -profileImage.public_id");

  if (!user) {
     throw({
          message: "User does not exists!",
          statusCode: 404
        });
  }
  return user;

}
export default { update, remove, getMe };
