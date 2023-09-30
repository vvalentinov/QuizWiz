const router = require('express').Router();

const userController = require('./controllers/userController');
const homeController = require('./controllers/homeController');

router.use('/users', userController);
router.use(homeController);

module.exports = router;