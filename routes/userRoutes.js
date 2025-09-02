const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware'); 

// Only logged-in user can update/delete their account
router.put('/update', protect, userController.updateUser);
router.delete('/delete', protect, userController.deleteUser);

module.exports = router;
