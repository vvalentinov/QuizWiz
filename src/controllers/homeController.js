const router = require('express').Router();

const { homeRoute } = require('../constants/routesNames');

router.get(homeRoute, (req, res) => {
    res.render('home');
});

module.exports = router;
