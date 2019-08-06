const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");

router.post(
  "/api/users/register",
  validation.validateUsers,
  userController.create
);

module.exports = router;
