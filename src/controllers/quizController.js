const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('quizzes/create');
});

module.exports = router;