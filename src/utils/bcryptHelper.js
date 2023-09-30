const bcrypt = require('bcrypt');

exports.generateHash = async (input, saltRounds) => {
    const hash = await bcrypt.hash(input, saltRounds);

    return hash;
};