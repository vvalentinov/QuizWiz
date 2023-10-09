const User = require('../models/User');
const UserRole = require('../models/UserRole');

const { uploadImage, deleteImage } = require('../utils/cloudinaryUtil');
const { generateToken } = require('../utils/generateTokenUtil');
const { validateUserPassword, generateHash } = require('../utils/bcryptUtil');

const path = require('path');

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
        updatedUser.profileImage,
        await getUserRoleName(updatedUser._id));

    return token;
};

exports.changeUsername = async (userId, newUsername) => {
    if (!newUsername) {
        throw new Error('Username input is empty!');
    }

    await User.findByIdAndUpdate(userId, { username: newUsername });
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
    if (!oldPassword || !newPassword) {
        throw new Error('You must enter both Old Password and New Password!');
    }

    const user = await User.findById(userId);
    const isOldPasswordValid = await validateUserPassword(oldPassword, user.password);
    if (!isOldPasswordValid) {
        throw new Error('Oops! The old password you entered is incorrect. Please try again.❌');
    }

    const newPasswordHash = await generateHash(newPassword, 10);
    await User.updateOne({ _id: userId }, { password: newPasswordHash });
};

exports.getUserWithId = (userId) => User.findById(userId);

const getUserRoleName = async (userId) => {
    const user = await User.findById(userId);
    const role = (await UserRole.findById(user.role)).name;
    return role;
};