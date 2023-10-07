const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quizzes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;