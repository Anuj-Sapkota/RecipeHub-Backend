import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
const router = express.Router();
//update user
router.put('/:id', auth, userController.updateUser);
//Delete User
router.delete("/:id", auth, userController.deleteUser);
//get the logged in user
router.get("/me", auth, userController.getCurrentUser);
export default router;