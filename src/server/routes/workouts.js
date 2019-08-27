const express = require("express");
const router = express.Router();
const validation = require("./validation");

const workoutController = require("../controllers/workoutController");
const helper = require("../auth/helpers");

router.get("/api/users/:username/workouts/:id", workoutController.show);
router.get("/api/users/:username/workouts/:id/edit", workoutController.edit);

router.post(
  "/api/users/:username/workouts/create",
  helper.ensureAuthenticated,
  validation.validateWorkouts,
  workoutController.create
);
router.post(
  "/api/users/:username/workouts/:id/update",
  validation.validateWorkouts,
  workoutController.update
);
router.post(
  "/api/users/:username/workouts/:id/destroy",
  workoutController.destroy
);

module.exports = router;
