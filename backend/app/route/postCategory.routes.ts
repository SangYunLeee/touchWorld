const { authJwt } = require("../middleware");
const ctl = require("../controller/postCategory.controller");
var router = require("express").Router();

export default app => {
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
  // Delete a PostCategory with id
  router.delete("/:id", [authJwt.verifyToken], ctl.deleteOne);
  app.use('/api/postCategory', router);
};
