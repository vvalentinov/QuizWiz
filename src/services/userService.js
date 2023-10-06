const User = require('../models/User');
const UserRole = require('../models/UserRole');

const { generateToken } = require('../utils/generateToken');
const { validateUserPassword } = require('../utils/bcryptHelper');
const { uploadImage } = require('../utils/uploadImage');

require('dotenv').config();

const path = require('path');

exports.register = async (
    username,
    image,
    password,
    repeatPassword) => {
    const user = await User.findOne({ username });
    if (user) {
        throw new Error('User already exists!');
    }

    let userImage = process.env.CLOUDINARY_USER_ICON_URL;

    if (image) {
        const imageExt = path.extname(image.originalname);

        if (imageExt != '.png' &&
            imageExt != '.jpg' &&
            imageExt != '.jpeg') {
            throw new Error('Image file must be in format: .png, .jpg or .jpeg!');
        }

        const { secure_url } = await uploadImage(image.buffer, 'Users');
        userImage = secure_url;
    }

    const createdUser = await User.create({
        username,
        image: userImage,
        password,
        repeatPassword,
        role: await getUserRoleId(),
    });

    const token = await generateToken(
        createdUser._id,
        createdUser.username,
        createdUser.image);

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

    const token = await generateToken(
        user._id,
        user.username,
        user.image);

    return token;
};

const getUserRoleId = async () => (await UserRole.findOne({ name: 'user' }))._id;