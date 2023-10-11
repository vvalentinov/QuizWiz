const router = require('express').Router();

const { createQuizRoute } = require('../constants/routesNames/quiz');

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
    const creator = req.user._id;

    await quizService.create(title, categoryId, description, Number(questionsCount), creator);

    res.redirect('/');
});

module.exports = router;