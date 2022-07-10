export {}

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let db : any = {};
db.mongoose = mongoose;
db.user = require("./user.model")(mongoose);
db.role = require("./role.model")(mongoose);
db.comment = require("./comment.model")(mongoose);
db.post = require("./post.model")(mongoose);
db.postCategory = require("./postCategory.model")(mongoose);
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;