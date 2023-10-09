const User = require('../models/User');
const UserRole = require('../models/UserRole');

const { generateToken } = require('../utils/generateTokenUtil');
const { validateUserPassword } = require('../utils/bcryptUtil');
const { uploadImage } = require('../utils/cloudinaryUtil');

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

    let userImageId = process.env.CLOUDINARY_USER_ICON_ID;
    let userImageUrl = process.env.CLOUDINARY_USER_ICON_URL;

    if (image) {
        const imageExt = path.extname(image.originalname);

        if (imageExt != '.png' &&
            imageExt != '.jpg' &&
            imageExt != '.jpeg') {
            throw new Error('Image file must be in format: .png, .jpg or .jpeg!');
        }

        const { public_id, secure_url } = await uploadImage(image.buffer, 'Users');
        userImageId = public_id;
        userImageUrl = secure_url;
    }

    const createdUser = await User.create({
        username,
        profileImage: {
            publicId: userImageId,
            url: userImageUrl,
        },
        password,
        repeatPassword,
        role: await getUserRoleId(),
    });

    const token = await generateToken(
        createdUser._id,
        createdUser.username,
        createdUser.profileImage,
        'user');

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
        user.profileImage,
        await getUserRoleName(user._id));

    return token;
};

exports.getUserWithId = (userId) => User.findById(userId);

const getUserRoleName = async (userId) => {
    const user = await User.findById(userId);
    const role = (await UserRole.findById(user.role)).name;
    return role;
};

const getUserRoleId = async () => (await UserRole.findOne({ name: 'user' }))._id;