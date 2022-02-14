// include
const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');

// express app setting
const app = express();

// set view settings

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home.ejs');
})










app.listen(3000, () => {
    console.log("listening good...");
})

