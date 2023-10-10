const router = require('express').Router();

const categoryService = require('../services/categoryService');

const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdminMiddleware');

router.get('/create', isAuthenticated, isAdmin, (req, res) => {
    res.render('categories/create');
});

router.post(
    '/create',
    isAuthenticated,
    isAdmin,
    async (req, res) => {
        const { categoryName } = req.body;
        await categoryService.create(categoryName);
        res.redirect('/');
    });

module.exports = router;