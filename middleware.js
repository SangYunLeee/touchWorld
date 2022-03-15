const requireLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnUrl = req.originalUrl;
        return res.redirect('/user/login');
    }
    next();
};

module.exports.requireLogin = requireLogin;