import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [String],
  instructions: { type: String },
  image: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required!"],
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
      },
      score: {
        type: Number,
        required: [true, "Score is required"],
        min: 1,
        max: 5,
      },
    },
  ],
  averageRating: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const recipeModel = mongoose.model("Recipe", recipeSchema);

export default recipeModel;
