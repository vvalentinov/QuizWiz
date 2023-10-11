const router = require('express').Router();

const userController = require('./controllers/userController');
const userSettingsController = require('./controllers/userSettingsController');
const homeController = require('./controllers/homeController');
const quizController = require('./controllers/quizController');
const categoryController = require('./controllers/categoryController');

router.use('/user', userController);
router.use('/user/settings', userSettingsController);
router.use('/quiz', quizController);
router.use('/category', categoryController);
router.use(homeController);
router.use('*', (req, res) => {
    res.status(404).render('statusCodePages/404');
});

module.exports = router;