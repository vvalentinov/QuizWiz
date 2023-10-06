const router = require('express').Router();

const userController = require('./controllers/userController');
const homeController = require('./controllers/homeController');
const quizController = require('./controllers/quizController');

router.use('/users', userController);
router.use('/quiz', quizController);
router.use(homeController);
router.use('*', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;