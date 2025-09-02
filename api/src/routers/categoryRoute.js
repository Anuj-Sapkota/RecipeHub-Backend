import express from "express";
import roleBasedAccess from "../middlewares/roleBasedAccess.js";
import { ADMIN } from "../constants/role.js";
import {
  createCategory,
  deleteCategory,
  findCategoryById,
  findCategoryByName,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", roleBasedAccess(ADMIN), createCategory);

router.patch("/:id", roleBasedAccess(ADMIN), updateCategory);
router.delete("/:id", roleBasedAccess(ADMIN), deleteCategory);
router.get("/", roleBasedAccess(ADMIN), findCategoryByName);
router.get("/:id", roleBasedAccess(ADMIN), findCategoryById);
export default router;