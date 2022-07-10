import express from "express";
import cors from "cors";
import dbConfig from "./app/config/db.config";
import path from "path";
import db from "./app/model";
require("dotenv").config();
const app = express();
var corsOptions = {
  origin: true,
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// connect to DB
const Role = db.role;
let mongodbUrl = process.env.MONGO_URL;
db.mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

  // routes
require("./app/route/auth.routes").default(app);
require("./app/route/user.routes").default(app);
require("./app/route/post.routes").default(app);
require("./app/route/postCategory.routes").default(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
} else {

}

// simple route
app.get("/", (req, res : express.Response) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

// Set static folder
// All the javascript and css files will be read and served from this folder

// }
