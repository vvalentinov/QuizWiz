const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

exports.addQuestionToQuiz = async (questionData, quizId) => {
    const correctAnswer = Number(questionData.correctAnswer);
    if (isNaN(correctAnswer) ||
        correctAnswer < 0 ||
        correctAnswer > 3) {
        throw new Error('Invalid input!');
    }

    const questionInput = questionData.question;
    const inputAnswers = questionData.answers;

    let answers = [];
    inputAnswers.forEach((answer, index) => answers.push({ answer, isCorrect: index === Number(correctAnswer) }));

    const question = await Question.create({ question: questionInput, answers });

    const quiz = await Quiz.findById(quizId);
    quiz.questions.push(question);
    await quiz.save();
};