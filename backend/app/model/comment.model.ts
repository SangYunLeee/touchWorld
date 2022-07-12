const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export var Comment = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  }
}, {
  timestamps: true
});

export default (mongoose) => {
  const CommentScheme = mongoose.model("Comment", Comment);
  return CommentScheme;
};