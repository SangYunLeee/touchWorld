export {}

module.exports = mongoose => {
  const Rule = mongoose.model(
    "Role",
    new mongoose.Schema({
      name: String
    })
  );
  return Rule;
}
