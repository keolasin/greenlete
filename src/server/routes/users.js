const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");

router.get("/api/users/:id", userController.userInfo);

router.post(
  "/api/users/register",
  validation.validateUsers,
  userController.create
);

router.post(
  "/api/users/sign_in",
  validation.validateUsers,
  userController.signIn
);

module.exports = router;
