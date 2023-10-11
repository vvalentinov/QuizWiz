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
    questionsCount: {
        type: Number,
        required: true,
        max: 50,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed'],
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
    questions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Question',
        required: true,
    }],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;