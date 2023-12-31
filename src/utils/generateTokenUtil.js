const jwt = require('../lib/jwt');

const { JWT_SECRET } = require('../constants/jwtConstants');

exports.generateToken = async (_id, username, profileImage, role) => {
    const payload = { _id, username, profileImage, role };

    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });

    return token;
};