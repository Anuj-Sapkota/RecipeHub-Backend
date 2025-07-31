import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  profileImage: String,
  bio: String,

  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  createdRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
