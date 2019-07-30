// .env setup
require("dotenv").config();

// use cors to interface with react app
const cors = require("cors");

// modules and middleware
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const session = require("express-session");
const logger = require("morgan");

module.exports = {
  init(app, express) {
    // cors
    app.use(cors());

    // static files from react app in /greenlete
    app.use(express.static(path.join(__dirname, "greenlete/build")));

    // logger
    app.use(logger("dev"));

    // settings for server
    app.use(express.json());

    // bodyParser
    app.use(bodyParser.urlencoded({ extended: true }));

    // express session
    app.use(
      session({
        secret: process.env.STATE_SECRETS,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 604800 } // 7 days
      })
    );
  }
};
