import {create} from "../controller/comment.controller";
const { authJwt } = require("../middleware");
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
  router.post("/", [authJwt.verifyToken], create);
  app.use('/api/comment', router);
};