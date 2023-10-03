const mongoose = require('mongoose');

const { generateHash } = require('../utils/bcryptHelper');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    image: {
        type: String,
        required: [true, 'User image is required!'],
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