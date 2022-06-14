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
  // Create a new PostCategory
  router.post("/", [authJwt.verifyToken], ctl.create);
  // Get Categories by UID
  router.get("/", ctl.findByUser);

  app.use('/postCategory', router);
};
