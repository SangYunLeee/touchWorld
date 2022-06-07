const { authJwt } = require("../middleware");
const ctl = require("../controller/postCategory.controller.js");
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
  router.post("/", [authJwt.verifyToken], ctl.create);
  app.use('/postCategory', router);
};