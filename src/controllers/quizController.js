const router = require('express').Router();

const { createQuizRoute, userPendingQuizzesRoute } = require('../constants/routesNames/quiz');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const categoryService = require('../services/categoryService');
const quizService = require('../services/quizService');

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

module.exports = router;