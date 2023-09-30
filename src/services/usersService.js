const User = require('../models/User');

const { generateToken } = require('../utils/generateToken');

exports.register = async (userData) => {
    const user = await User.findOne({ username: userData.username });

    if (user) {
        throw new Error('User already exists!');
    }

    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser._id, createdUser.username);

    return token;
};