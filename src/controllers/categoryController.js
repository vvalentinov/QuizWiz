const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('categories/create');
});

module.exports = router;