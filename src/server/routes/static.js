// require express, set up router
const express = require("express");
const router = express.Router();

// use appropriate controller
const staticController = require("../controllers/staticController");

// define routes
/* GET */
router.get("/*", staticController.index); // handles cases where the client-side router (CSR) is not yet handling routing, so direct requests to the server will pass control back to the CSR

//router.get("/", staticController.index); // homepage, pass routing to client using react-router

// export router
module.exports = router;
