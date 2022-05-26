module.exports = mongoose => {
  mongoose.set('toJSON', { virtuals: true });
  var schema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  schema.virtual('id').get(function() {
    return this._id;
  });

  const User = mongoose.model(
    "User",
    schema
  );
  return User;
}
