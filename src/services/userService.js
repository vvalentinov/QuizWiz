const User = require('../models/User');
const UserRole = require('../models/UserRole');

const { generateToken } = require('../utils/generateToken');
const { validateUserPassword } = require('../utils/bcryptHelper');
const { uploadImage, deleteImage } = require('../utils/cloudinaryUtil');

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
        createdUser.profileImage);

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
        user.profileImage);

    return token;
};

exports.getUserWithId = (userId) => User.findById(userId);

exports.changeUserPicture = async (userId, image) => {
    if (!image) {
        throw new Error('Profile picture input is empty!');
    }

    const imageExt = path.extname(image.originalname);

    if (imageExt != '.png' &&
        imageExt != '.jpg' &&
        imageExt != '.jpeg') {
        throw new Error('Image file must be in format: .png, .jpg or .jpeg!');
    }

    const user = await User.findById(userId);

    await deleteImage(user.profileImage.publicId);

    const { public_id, secure_url } = await uploadImage(image.buffer, 'Users');
    const updatedUser = await User.findByIdAndUpdate(userId, {
        'profileImage.publicId': public_id,
        'profileImage.url': secure_url,
    }, { new: true });

    const token = await generateToken(
        updatedUser._id,
        updatedUser.username,
        updatedUser.profileImage);

    return token;
};

exports.changeUsername = async (userId, newUsername) => {
    if (!newUsername) {
        throw new Error('Username input is empty!');
    }
    await User.findByIdAndUpdate(userId, { username: newUsername });
    // const user = await User.findById(userId);
};

const getUserRoleId = async () => (await UserRole.findOne({ name: 'user' }))._id;