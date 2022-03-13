// include
const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose');

// express app setting
const app = express();

// set view settings
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session(
            {   secret: 'hey it is secret',
                resave: true,
                saveUninitialized: true
            })
);

// Model
const PostModel = require('./model/post');
const UserModel = require('./model/user');

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/user/login');
    }
    next();
};

app.get('/', async (req, res) =>  {
    const imgArray = await PostModel.find({});
    res.render('home', {imgArray});
})

app.get('/new', requireLogin, (req, res) => {
    res.render('new');
});

app.get('/user/login', (req, res) => {
    res.render('user/login');
});

app.post('/user/login', async (req, res) => {
    const {id, password} = req.body;
    const user = await UserModel.findAndValidate(id, password);
    if (user) {
        req.session.user_id = user._id;
    } else {
        req.session.user_id = null;
    }
    res.redirect('/');
});

app.post('/user/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.get('/user/register', async (req, res) => {
    res.render('user/register');
});

app.post('/user/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new UserModel({
        username: username,
        pwd: password
    });
    await user.save();
    res.redirect('/');
});

app.get('/user/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/user/login');
});

app.get('/secret', (req, res) => {
    if (!req.session.user_id) {
        res.send("plz login");
    } else {
        res.send('IT is secret');
    }
});


app.post('/', async (req, res) => {
    const body = req.body;
    const img = new PostModel({title: body.title, description: body.description, thumbnailUrl: body.url });
    await img.save();
    res.redirect(`/`);
});

app.get('/:id', async (req, res) =>  {
    try {
        const img = await PostModel.findById(req.params.id);
        if (!img) {
            return res.redirect('/');
        }
        res.render('show', { img });
    } catch (error) {
        return res.redirect('/');
    }
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log("DB connected");
});

const dbUrl = "mongodb://localhost:27017/touch-world";
mongoose.connect(dbUrl, {
});

app.listen(3000, () => {
    console.log("listening good...");
})

