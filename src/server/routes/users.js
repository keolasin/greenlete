const express = require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");

router.get("/api/users/check", userController.check);

router.post(
  "/api/users/register",
  validation.validateUsers,
  userController.create
);

router.post("/api/users/sign_in", userController.signIn);

router.post("/api/users/logout", userController.signOut);

module.exports = router;
