const express = require('express');
const router = express.Router();
const {requireLogin} = require('../middleware');
const {catchAsync} = require('../utils/catchAsync');
const PostModel = require('../model/post');

router.get('/', catchAsync(async (req, res) =>  {
    const imgArray = await PostModel.find({});
    res.render('home', {imgArray});
}))

router.get('/new', requireLogin, (req, res) => {
    res.render('new');
});

router.post('/', requireLogin, catchAsync(async (req, res) => {
    const body = req.body;
    const img = new PostModel({title: body.title, description: body.description, thumbnailUrl: body.url });
    await img.save();
    res.redirect(`/`);
}));

router.get('/:id', catchAsync(async (req, res) =>  {
    try {
        const img = await PostModel.findById(req.params.id);
        if (!img) {
            return res.redirect('/');
        }
        res.render('show', { img });
    } catch (error) {
        return res.redirect('/');
    }
}));

module.exports = router;