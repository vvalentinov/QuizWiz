const router = require('express').Router();

const { JWT_KEY } = require('../constants/jwtConstants');

const userService = require('../services/userService');

const { getErrorMessage } = require('../utils/errorHelper');

const { registerRoute, loginRoute } = require('../constants/routesNames');

const multer = require('multer');

router.get(registerRoute, (req, res) => {
    res.render('users/register');
});

router.post(registerRoute, multer().single('image'), async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    const image = req.file;

    try {
        const token = await userService.register(username, image, password, repeatPassword);
        res.cookie(JWT_KEY, token);
        res.redirect('/');
    } catch (error) {
        res.render('users/register', {
            username,
            password,
            repeatPassword,
            errorMessage: getErrorMessage(error),
        });
    }
});

router.get(loginRoute, (req, res) => {
    res.render('users/login');
});

router.post(loginRoute, async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userService.login(username, password);
        res.cookie(JWT_KEY, token);
        res.redirect('/');
    } catch (error) {
        res.render('users/login', {
            username,
            password,
            errorMessage: getErrorMessage(error),
        });
    }
});

router.get('/settings/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserWithId(userId).populate('role').lean();
    res.render('users/settings', { user });
});

router.post('/settings/picture', (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie(JWT_KEY);
    res.redirect('/');
});

module.exports = router;