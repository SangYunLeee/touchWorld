const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const postSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    thumbnailUrl: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Post', postSchema);