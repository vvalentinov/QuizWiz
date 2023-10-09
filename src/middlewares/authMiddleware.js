const jwt = require('../lib/jwt');

const { JWT_KEY, JWT_SECRET } = require('../constants/jwtConstants');

exports.authenticate = async (req, res, next) => {
    const token = req.cookies[JWT_KEY];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, JWT_SECRET);

            req.user = decodedToken;

            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.isAdmin = decodedToken.role === 'admin';

            next();
        } catch (error) {
            res.clearCookie(JWT_KEY);
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

exports.isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }

    next();
}