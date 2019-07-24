// require express, set up router
const express = require("express");
const router = express.Router();

// use appropriate controller
const staticController = require("../controllers/staticController");

// define routes
/* GET */
router.get("/", staticController.index); // homepage

// export router
module.exports = router;
