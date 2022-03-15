const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: false
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Post', postSchema);