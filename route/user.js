const express = require('express');
const passport = require('passport');
const router = express.Router();
const {catchAsync} = require('../utils/catchAsync');

// local include
const UserModel = require('../model/user');

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/user/login'}), catchAsync(async (req, res) => {
    const redirectUrl = req.session.returnUrl || '/';
    res.redirect(redirectUrl);
}));

router.get('/register', catchAsync(async (req, res) => {
    res.render('user/register');
}));

router.post('/register', catchAsync(async (req, res) => {
    const { password, username } = req.body;
    const user = new UserModel({
        username: username
    });
    const registeredUser = await UserModel.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
    })
    res.redirect('/');
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;