const Quiz = require('../models/Quiz');

exports.create = (
    title,
    category,
    description,
    questionsCount,
    creator) => Quiz.create({
        title,
        category,
        description,
        questionsCount,
        creator,
        status: 'Pending',
    });

exports.getUserPendingQuizzes = (userId) => Quiz.find({ creator: userId, status: 'Pending' });