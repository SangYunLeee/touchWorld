const { authJwt } = require("../middleware");
const postCtl = require("../controller/post.controller.js");
var router = require("express").Router();

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Create a new Post
  router.post("/", [authJwt.verifyToken], postCtl.create);
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
  app.use('/post', router);
};