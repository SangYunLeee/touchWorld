const express = require('express');
const passport = require('passport');
const router = express.Router();

// local include
const UserModel = require('../model/user');

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/user/login'})  ,async (req, res) => {
    res.redirect('/');
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get('/register', async (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new UserModel({
        username: username
    });
    const registeredUser = await UserModel.register(user, password);
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/user/login');
});


module.exports = router;