// include
const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose');

// local include

const postRoute = require('./route/post');
const userRoute = require('./route/user');

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

app.use('/post', postRoute);
app.use('/user', userRoute);


app.get('/', async (req, res) =>  {
    res.redirect('/post');
});


// connect
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

