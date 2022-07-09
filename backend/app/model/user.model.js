module.exports = (mongoose) => {
  mongoose.set("toJSON", { virtuals: true });
  var schema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: String,
      password: {
        type: String,
        required: true,
        unique: true,
      },
      nickname: {
        type: String,
        unique: false,
        sparse: true,
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
      postCategory: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PostCategory",
        },
      ],
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
  schema.virtual("id").get(function () {
    return this._id;
  });

  const User = mongoose.model("User", schema);
  return User;
};
