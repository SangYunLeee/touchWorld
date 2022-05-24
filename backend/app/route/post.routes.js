module.exports = app => {
  const postCtl = require("../controller/post.controller.js");
  var router = require("express").Router();
  // Create a new Post
  router.post("/", postCtl.create);
  // Retrieve all Tutorials
  router.get("/", postCtl.findAll);
  // Retrieve all published Tutorials
  router.get("/published", postCtl.findAllPublished);
  // Retrieve a single Post with id
  router.get("/:id", postCtl.findOne);
  // Update a Post with id
  router.put("/:id", postCtl.update);
  // Delete a Post with id
  router.delete("/:id", postCtl.delete);
  // Create a new Post
  router.delete("/", postCtl.deleteAll);
  app.use('/api/post', router);
};