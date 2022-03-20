const express = require('express');
const passport = require('passport');
const router = express.Router();
const {catchAsync} = require('../utils/catchAsync');
const {requireLogin} = require('../middleware');

// local include
const UserModel = require('../model/user');

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/user/login'}), catchAsync(async (req, res) => {
    const redirectUrl = req.session.returnUrl || '/';
    delete req.session.returnUrl;
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

router.get('/myProfile', requireLogin, (req, res) => {
    res.render('user/myProfile');
});

router.post('/myProfile', requireLogin, async (req, res) => {
    const {nickname, oldPassword, newPassword} = req.body;
    console.log(nickname);
    if (nickname) {
        req.user;
        const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, {nickname});
        if (!updatedUser) {
            req.flash('error', "로그인을 다시 해야될 것 같아요!");
            return res.redirect('/post');
        }
        req.flash('success', "닉네임이 변경되었어요");
        updatedUser.save();
    }

    if (oldPassword) {
        var user = await UserModel.findById(req.user._id);
        await user.changePassword(oldPassword, newPassword).then(() => {
            req.flash('success', "비밀번호가 변경되었어요!");
        })
        .catch((error) => {
            console.dir(error);
            req.flash('error', "비밀번호 변경에 실패했어요..");
        });
    }
    console.log("myProfile End");
    res.redirect('/post');
});

module.exports = router;