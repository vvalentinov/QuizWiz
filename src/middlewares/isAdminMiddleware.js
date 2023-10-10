exports.isAdmin = (req, res) => {
    const user = req.user;
    if (user.role !== 'admin') {
        res.status(403).render('statusCodePages/403');
    }
};