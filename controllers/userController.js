const userService = require('../services/userService');

// Update current user
const updateUser = async (req, res) => {
    try {
        const userId = req.user._id; // current logged-in user
        const updatedUser = await userService.updateUser(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete current user
const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        await userService.deleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    updateUser,
    deleteUser,
};
