import express from "express";
import categoryController from "../controllers/categoryController.js";
import roleBasedAccess from "../middlewares/roleBasedAccess.js";
import { ADMIN } from "../constants/role.js";

const router = express.Router();

router.post("/", roleBasedAccess(ADMIN), categoryController.createCategory);

// new routes
router.get("/", categoryController.getAllCategories);

//get by category name
router.get("/name/:name", categoryController.getCategoryByName);

//get by category id
router.get("/:id", categoryController.getCategoryById);

//update category
router.put("/:id", categoryController.updateCategory);

//delete category
router.delete("/:id", categoryController.deleteCategory);

export default router;
