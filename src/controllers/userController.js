const router = require('express').Router();

const { JWT_KEY } = require('../constants/constants');

const userService = require('../services/userService');

const { getErrorMessage } = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    try {
        const token = await userService.register(username, password, repeatPassword);
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

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
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

router.get('/logout', (req, res) => {
    res.clearCookie(JWT_KEY);
    res.redirect('/');
});

module.exports = router;