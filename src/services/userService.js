const User = require('../models/User');

const { generateToken } = require('../utils/generateToken');
const { validateUserPassword } = require('../utils/bcryptHelper');

exports.register = async (username, password, repeatPassword) => {
    const user = await User.findOne({ username });
    if (user) {
        throw new Error('User already exists!');
    }

    const createdUser = await User.create({ username, password, repeatPassword });

    const token = await generateToken(createdUser._id, createdUser.username);

    return token;
};

exports.login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password!');
    }

    const isPassValid = await validateUserPassword(password, user.password);
    if (!isPassValid) {
        throw new Error('Invalid username or password!');
    }

    const token = await generateToken(user._id, user.username);

    return token;
};