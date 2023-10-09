const router = require('express').Router();

const { JWT_KEY } = require('../constants/jwtConstants');

const userSettingsService = require('../services/userSettingsService');

const { getErrorMessage } = require('../utils/errorUtil');

const {
    userSettingsRoute,
    changeUserPictureRoute,
    changeUserUsernameRoute,
    changeUserPasswordRoute,
} = require('../constants/routesNames/userSettings');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const multer = require('multer');

router.get(userSettingsRoute, async (req, res) => {
    const userId = req.params.userId;
    const user = await userSettingsService.getUserWithId(userId).populate('role').lean();
    res.render('users/settings', { user });
});

router.post(changeUserPictureRoute,
    isAuthenticated,
    multer().single('image'),
    async (req, res) => {
        const userId = req.user._id;
        try {
            const token = await userSettingsService.changeUserPicture(userId, req.file);
            res.clearCookie(JWT_KEY);
            res.cookie(JWT_KEY, token);
            res.redirect('/');
        } catch (error) {
            const user = await userSettingsService.getUserWithId(userId).populate('role').lean();
            res.render('users/settings', { user, errorMessage: getErrorMessage(error) });
        }
    });

router.post(changeUserUsernameRoute, isAuthenticated, async (req, res) => {
    const { username } = req.body;
    const userId = req.user._id;
    try {
        await userSettingsService.changeUsername(userId, username);
        res.redirect('/');
    } catch (error) {
        const user = await userSettingsService.getUserWithId(userId).populate('role').lean();
        res.render('users/settings', { user, errorMessage: getErrorMessage(error) });
    }
});

router.post(changeUserPasswordRoute, isAuthenticated, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;
    try {
        await userSettingsService.changePassword(userId, oldPassword, newPassword);
        res.redirect('/');
    } catch (error) {
        const user = await userSettingsService.getUserWithId(userId).populate('role').lean();
        res.render('users/settings', { user, errorMessage: getErrorMessage(error) });
    }
});

module.exports = router;