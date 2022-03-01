// include
const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');

// express app setting
const app = express();

// set view settings
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
    description: String
});
const ImageModel = mongoose.model('Image', ImageSchema);

app.get('/', async (req, res) =>  {
    const imgArray = await ImageModel.find({});
    res.render('home', {imgArray});
})

app.get('/new', (req, res) => {
    res.render('new');
});

app.get('/user/login', (req, res) => {
    res.render('user/login');
});

app.get('/user/register', async (req, res) => {
    res.render('user/register');
});


app.post('/', async (req, res) => {
    console.dir(req.body);
    const body = req.body;
    const img = new ImageModel({filename: body.title, description: body.description, url: body.url });
    await img.save();
    res.redirect(`/`);
});

app.get('/:id', async (req, res) =>  {
    try {
        const img = await ImageModel.findById(req.params.id);
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

