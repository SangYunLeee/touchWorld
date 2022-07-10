export {}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var PostCategory = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

PostCategory.virtual("id").get(function () {
  return this._id;
});

PostCategory.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = (mongoose) => {
  return mongoose.model("PostCategory", PostCategory);
};