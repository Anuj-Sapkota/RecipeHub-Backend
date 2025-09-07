import commentService from "../services/commentService.js";

const createComment = async (req, res) => {

  try {
    const { recipeId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const comment = await commentService.create(recipeId, userId, content);

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCommentsByRecipeId = async (req, res) => {

  try {
    const { recipeId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const comments = await commentService.getByRecipeId(recipeId, page, limit);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateComment = async (req, res) => {

  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const updatedComment = await commentService.update(commentId, userId, content);

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteComment = async (req, res) => {
  
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    await commentService.remove(commentId, userId);

    res.status(200).send("Comment deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {
  createComment,
  getCommentsByRecipeId,
  updateComment,
  deleteComment,
};
