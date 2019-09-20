const express = require("express");
const router = express.Router();
const validation = require("./validation");

const litterController = require("../controllers/litterController");
const helper = require("../auth/helpers");

router.get("/api/users/:username/litter/:id", litterController.showOne);
router.get("/api/users/:username/litter/", litterController.showMany);

router.post(
  "/api/users/:username/litter/create",
  helper.ensureAuthenticated,
  validation.validateLitter,
  litterController.create
);
router.post(
  "/api/users/:username/litter/:id/update",
  validation.validateLitter,
  litterController.update
);
router.post(
  "/api/users/:username/litter/:id/destroy",
  litterController.destroy
);

module.exports = router;
