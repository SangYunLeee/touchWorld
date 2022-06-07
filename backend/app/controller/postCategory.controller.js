const db = require("../model");
const PostCategory = db.postCategory;
// Create and Save a new PostCategory
exports.create = (req, res) => {
  // expect body.
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
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PostCategory.",
      });
    });
};
// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  PostCategory.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find a single PostCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  PostCategory.findById(id).populate('author')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found PostCategory with id " + id });
      else {
        res.send(data.toJSON());
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving PostCategory with id=" + id });
    });
};

// Delete a PostCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  PostCategory.findById(id)
    .then(postCategory => {
      if (postCategory.author && postCategory.author != req.userId) {
        throw 'incorrect author';
      }
      PostCategory.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          throw `Cannot delete PostCategory with id=${id}. Maybe PostCategory was not found!`
        } else {
          res.send({
            message: "PostCategory was deleted successfully!"
          });
        }
      })
    })
    .catch(err => {
      // status  404 와 500 후에 확인 필요.
      res.status(500).send({
        message: err
      });
    });
};
// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  PostCategory.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Tutorials were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
  PostCategory.find({ published: true })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};
