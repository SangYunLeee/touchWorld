const requireLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/login');
    }
    next();
};

module.exports.requireLogin = requireLogin;