const db = require("../model");
const Post = db.post;
const User = db.user;
// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    author: req.userId
  });
  // Save Post in the database
  post
    .save(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post.",
      });
    });
};
// Retrieve all Posts from the database.
exports.findAll = async (req, res) => {
  const title = (req.query.title || "").toString();
  const author = req.query.author || "";

  console.log("author: ", author);
  console.log("title: ", title);

  const titleFilter = title ? { $regex: new RegExp(title), $options: "i" } : {};
  var authorFilter = {};
  author && await User.findOne({username: author})
    .then(data => {
      if (data) {
        console.log("TEST 1", data);
        authorFilter = data.id;
      }
    })
    .catch(err => {
      console.log(err.message);
    });
    console.log("TEST 2");
  var condition = title ? {
      title: titleFilter,
      author: authorFilter
    } : {};
  Post.find(condition)
    .then(data => {
      console.log("data: ", data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findById(id).populate('author')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else {
        res.send(data.toJSON());
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};
// Update a Post by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send({ message: "Post was updated successfully.", ...data.toJSON() });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};
// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      if (post.author && post.author != req.userId) {
        throw 'incorrect author';
      }
      Post.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          throw `Cannot delete Post with id=${id}. Maybe Post was not found!`
        } else {
          res.send({
            message: "Post was deleted successfully!"
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
  Post.deleteMany({})
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
  Post.find({ published: true })
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
