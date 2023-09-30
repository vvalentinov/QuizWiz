const router = require('express').Router();

const userService = require('../services/userService');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
});

module.exports = router;