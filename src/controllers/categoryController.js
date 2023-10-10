const router = require('express').Router();

const categoryService = require('../services/categoryService');

const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdminMiddleware');

const { createRoute } = require('../constants/routesNames/category');

router.get(
    createRoute,
    isAuthenticated,
    isAdmin,
    (req, res) => {
        res.render('categories/create');
    });

router.post(
    createRoute,
    isAuthenticated,
    isAdmin,
    async (req, res) => {
        const { categoryName } = req.body;
        await categoryService.create(categoryName);
        res.redirect('/');
    });

module.exports = router;