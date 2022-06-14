const db = require("../model");
const PostCategory = db.postCategory;
// Create and Save a new PostCategory

var ctl = {
  create : null,
  findByUser: null
}

ctl.create = (req, res) => {
  // expect
    // body. {title}
    // login
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a PostCategory
  const postCategory = new PostCategory({
    title: req.body.title,
    author: req.userId
  });
  // Save PostCategory in the database
  postCategory
    .save(postCategory)
    .then((data) => {
      console.log("SUCESS POSTCATEGORY")
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PostCategory.",
      });
    });
};

// Find a single PostCategory with an id
  // pass
    // query: userId
ctl.findByUser = (req, res) => {
  const {userId} = req.query;
  console.log("findByUser CALLED")
  console.log("userId: ", userId, req.query);
  PostCategory.find({author: userId})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found PostCategory with userId " + userId });
      else {
        console.log("founded data: ", data);
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving PostCategory with userId=" + userId });
    });
};

module.exports = ctl;