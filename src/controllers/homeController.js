const router = require('express').Router();

const { homeRoute } = require('../constants/routesNames/home');

router.get(homeRoute, (req, res) => {
    res.render('home');
});

module.exports = router;
