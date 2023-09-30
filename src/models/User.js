const mongoose = require('mongoose');

const { generateHash } = require('../utils/bcryptHelper');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function () {
    const hash = await generateHash(this.password, 10);

    this.password = hash;
});

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Password and repeat-password do not match!');
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;