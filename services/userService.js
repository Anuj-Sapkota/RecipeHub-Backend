const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const updateUser = async (userId, data) => {
    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
    return updatedUser;
};

const deleteUser = async (userId) => {
    await User.findByIdAndDelete(userId);
};

module.exports = {
    updateUser,
    deleteUser,
};
