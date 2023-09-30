const router = require('express').Router();

const { JWT_KEY } = require('../constants/constants');

const userService = require('../services/userService');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    const token = await userService.register(userData);
    res.cookie(JWT_KEY, token);
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie(JWT_KEY);
    res.redirect('/');
});

module.exports = router;