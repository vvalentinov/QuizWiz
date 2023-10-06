const router = require('express').Router();

const { createQuizRoute } = require('../constants/routesNames');

router.get(createQuizRoute, (req, res) => {
    res.render('quizzes/create');
});

module.exports = router;