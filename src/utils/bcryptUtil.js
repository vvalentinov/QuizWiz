const bcrypt = require('bcrypt');

exports.generateHash = async (input, saltRounds) => {
    const hash = await bcrypt.hash(input, saltRounds);

    return hash;
};

exports.validateUserPassword = async (inputPassword, userPassword) => {
    const isValid = await bcrypt.compare(inputPassword, userPassword);

    return isValid;
};