const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controller/auth.controller");
export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
  app.put("/api/auth/userinfo",[authJwt.verifyToken], controller.updateUser);
  app.put("/api/auth/password",[authJwt.verifyToken], controller.updatePwd);
};
