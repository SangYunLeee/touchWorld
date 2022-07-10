import mongoose from "mongoose";
import express from "express";
const {Comment} = require("./comment.model");

const Schema = mongoose.Schema;

export var Post = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'PostCategory'
  },
  comments: [{
    type: Comment,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

Post.virtual("id").get(function () {
  return this._id;
});

Post.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default (mongoose) => {
  return mongoose.model("Post", Post);
};
