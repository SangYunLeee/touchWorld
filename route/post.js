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
    const img = new PostModel({title: body.title, description: body.description, thumbnailUrl: body.url, author: req.user._id });
    await img.save();
    res.redirect(`/`);
}));

router.delete('/:id', catchAsync(async (req, res) =>  {
    const {id} = req.params;
    const img = await PostModel.findByIdAndDelete(id);
    return res.redirect('/');
}));

router.get('/:id', catchAsync(async (req, res) =>  {
    const post = await PostModel.findById(req.params.id).populate('author');;
    if (!post) {
        return res.redirect('/');
    }
    res.render('show', { post });
}));

router.put('/:id', catchAsync(async (req, res) =>  {
    const {title, description, url} = req.body;
    const post = await PostModel.findByIdAndUpdate(req.params.id, {title, description, thumbnailUrl: url});
    if (!post) {
        return res.redirect('/');
    }
    post.save();
    res.redirect(`/post/${post._id}`);
}));

router.get('/:id/edit', catchAsync(async (req, res) =>  {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
        return res.redirect('/');
    }
    res.render('edit', { post });
}));

module.exports = router;