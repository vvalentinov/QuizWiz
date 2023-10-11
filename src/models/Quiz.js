const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questionsCount: {
        type: Number,
        required: true,
        max: 50,
    },
    questions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Question',
        required: true,
    }],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;