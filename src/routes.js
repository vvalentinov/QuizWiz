const router = require('express').Router();

const userController = require('./controllers/userController');
const homeController = require('./controllers/homeController');
const quizController = require('./controllers/quizController');

router.use('/users', userController);
router.use('/quiz', quizController);
router.use(homeController);

module.exports = router;