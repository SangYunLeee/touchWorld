const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "PostCategory",
      },
    },
    { timestamps: true }
  );
  schema.virtual("id").get(function () {
    return this._id;
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("Post", schema);
  return Post;
};
