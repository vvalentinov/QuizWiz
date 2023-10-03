const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'user',
    },
});

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;