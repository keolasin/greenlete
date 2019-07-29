// require express, set up router
const express = require("express");
const router = express.Router();

// use appropriate controller
const testController = require("../controllers/testController");

// define routes
/* GET */
router.get("/testApi", testController.test); // test data

// export router
module.exports = router;
