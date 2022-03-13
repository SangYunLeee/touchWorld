const requireLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be signed in');
        return res.redirect('/user/login');
    }
    next();
};

module.exports.requireLogin = requireLogin;