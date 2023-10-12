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
    const quiz = await quizService.getQuizById(req.params.quizId).populate('category').lean();

    res.render('quizzes/completeQuiz', { quiz, questionNumber: quiz.questions.length + 1 });
});

router.post(addQuestionRoute, isAuthenticated, async (req, res) => {
    const questionData = req.body;
    try {
        await questionService.addQuestionToQuiz(questionData, req.params.quizId);
        res.redirect('/');
    } catch (error) {
        const quiz = await quizService.getQuizById(req.params.quizId).lean();
        res.render('quizzes/completeQuiz', { quiz, errorMessage: getErrorMessage(error) });
    }
});

module.exports = router;