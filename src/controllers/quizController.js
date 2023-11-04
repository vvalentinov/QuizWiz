const router = require('express').Router();

const {
    createQuizRoute,
    userPendingQuizzesRoute,
    completeQuizRoute,
    addQuestionRoute,
} = require('../constants/routesNames/quiz');

const { getErrorMessage } = require('../utils/errorUtil');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const categoryService = require('../services/categoryService');
const quizService = require('../services/quizService');
const questionService = require('../services/questionService');

router.get(createQuizRoute, isAuthenticated, async (req, res) => {
    const categories = await categoryService.getAll().lean();
    res.render('quizzes/create', { categories });
});

router.post(createQuizRoute, isAuthenticated, async (req, res) => {
    const { title, description, category, questionsCount } = req.body;
    const categoryId = await categoryService.getCategoryId(category);
    const creatorId = req.user._id;

    await quizService.create(title, categoryId, description, Number(questionsCount), creatorId);

    res.redirect('/');
});

router.get(userPendingQuizzesRoute, isAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    const quizzes = await quizService.getUserPendingQuizzes(userId).populate('category').lean();
    const quizzesCount = quizzes.length;

    res.render('quizzes/pendingQuizzes', { quizzes, quizzesCount });
});

router.get(completeQuizRoute, isAuthenticated, async (req, res) => {
    const quiz = await quizService.getQuizById(req.params.quizId).populate('category').populate('questions').lean();
    res.render('quizzes/completeQuiz', { quiz, questionNumber: quiz.questions.length + 1 });
});

router.post(addQuestionRoute, isAuthenticated, async (req, res) => {
    const quizId = req.params.quizId;
    const quiz = await quizService.getQuizById(quizId).lean();
    try {
        await questionService.addQuestionToQuiz(req.body, quizId);
        res.redirect(`/quiz/complete/${quizId}`);
    } catch (error) {
        res.render('quizzes/completeQuiz', { quiz, errorMessage: getErrorMessage(error) });
    }
});

module.exports = router;