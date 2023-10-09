const mongoose = require('mongoose');

const { generateHash } = require('../utils/bcryptUtil');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    profileImage: {
        publicId: {
            type: String,
            required: [true, 'User image id is required!'],
        },
        url: {
            type: String,
            required: [true, 'User image is required!'],
        },
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'UserRole',
        required: true,
    },
});

userSchema.pre('save', async function () {
    const hash = await generateHash(this.password, 10);
    this.password = hash;
});

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Password and Repeat Password do not match!');
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;