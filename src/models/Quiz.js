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
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Question',
        required: true,
    }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;