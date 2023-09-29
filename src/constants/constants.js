require('dotenv').config();

exports.PORT = 3000;

exports.DB_NAME = 'quiz-wiz';

exports.JWT_KEY = 'Token';

exports.JWT_SECRET = process.env.JWT_SECRET;