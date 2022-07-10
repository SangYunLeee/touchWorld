export {}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("toJSON", { virtuals: true });
mongoose.set("toObject", { virtuals: true });

var User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    unique: true,
    sparse: true
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  postCategory: [{
    type: Schema.Types.ObjectId,
    ref: 'PostCategory'
  }]
});

User.virtual("id").get(function () {
  return this._id;
});

module.exports = (mongoose) => {
  return mongoose.model("User", User);
};
