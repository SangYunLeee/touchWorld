const express = require('express');
const router = express.Router();

// local include
const UserModel = require('../model/user');

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const {id, password} = req.body;
    const user = await UserModel.findAndValidate(id, password);
    if (user) {
        req.session.user_id = user._id;
    } else {
        req.session.user_id = null;
    }
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
        username: username,
        pwd: password
    });
    await user.save();
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/user/login');
});


// test
router.get('/secret', (req, res) => {
    if (!req.session.user_id) {
        res.send("plz login");
    } else {
        res.send('IT is secret');
    }
});

module.exports = router;