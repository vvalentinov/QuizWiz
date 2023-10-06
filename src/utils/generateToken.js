const jwt = require('../lib/jwt');

const { JWT_SECRET } = require('../constants/jwtConstants');

exports.generateToken = async (_id, username, image) => {
    const payload = { _id, username, image };

    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });

    return token;
};