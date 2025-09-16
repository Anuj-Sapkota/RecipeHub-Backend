import CommentModel from "../models/Comment.js";
import RecipeModel from "../models/Recipe.js";
import UserModel from "../models/User.js";

const create = async (recipeId, userId, content) => {
  const recipe = await RecipeModel.findById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const comment = await CommentModel.create({
    content,
    recipe: recipeId,
    user: userId,
  });

  return comment;
};

const getByRecipeId = async (recipeId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const comments = await CommentModel.find({ recipe: recipeId })
    .populate("user", "fullName profileImage")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit); // Latest comments first

  return comments;
};

const update = async (commentId, userId, newContent) => {
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (!comment.user.equals(userId)) {
    throw new Error("You are not authorized to update this comment");
  }

  comment.content = newContent;
  await comment.save();

  return comment;
};

const remove = async (commentId, userId) => {
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Check if the user is the owner of the comment
  if (!comment.user.equals(userId)) {
    throw new Error("You are not authorized to delete this comment");
  }

  await CommentModel.findByIdAndDelete(commentId);
};

//get comments of logged in user
const getCurrentUserComments = async (currUser, page, limit) => {
  const skip = (page - 1) * limit;

  const comment = await CommentModel.find({
    user: currUser._id,
  });
  const commentIds = comment.map((comm) => comm._id);

  const comments = await CommentModel.find({ _id: { $in: commentIds } })
    .skip(skip)
    .limit(limit);

  if (comments.length === 0) {
    throw new Error("No Comments Made.");
  }

  return comments;
};

export default {
  create,
  getByRecipeId,
  update,
  remove,
  getCurrentUserComments
};
