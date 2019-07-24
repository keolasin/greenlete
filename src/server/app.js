// modules
const express = require("express");

// config files
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");

// create express app
const app = express();

// routeConfig
appConfig.init(app, express);
routeConfig.init(app);

// export the app
module.exports = app;
