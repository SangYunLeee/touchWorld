const config = require("../config/auth.config");
const db = require("../model");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var ctl = {
  signup : null,
  signin : null,
  updateUser : null,
  updatePwd: null
}

ctl.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
ctl.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,

          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        roles: authorities,
        accessToken: token
      });
    });
};

ctl.updateUser = (req, res) => {
  User.findOne({
    id: req.userId
  })
    .then(user => {
      user.email = req.body.email;
      user.nickname = req.body.nickname;
      user.save()
        .then(user => {
          res.status(200).send({
            ...user.toJSON()
          })
        })
    })
    .catch(err => {
      res.status(500).send({message: err});
    })
}

ctl.updatePwd = (req, res) => {
  User.findOne({
    id: req.userId
  })
    .then(user => {
      if (!user) {

        return res.status(404).send({ message: "User Not found." });
      }
      console.log("body: ", req.body);
      console.log("user: ", user.password);
      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      user.password = bcrypt.hashSync(req.body.newPassword, 8);
      user.save()
        .then((user) => {
          res.status(200).send({
            message: "password changed"
          });
        })
    })
    .catch(err => {
      console.log("rr:" , err);
      res.status(500).send({message: err});
    })
}

module.exports = ctl;