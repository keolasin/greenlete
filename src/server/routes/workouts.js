const express = require("express");
const router = express.Router();
const validation = require("./validation");

const workoutController = require("../controllers/workoutController");
const helper = require("../auth/helpers");

router.get("/users/:userId/workouts/:id", workoutController.show);
router.get("/users/:userId/workouts/:id/edit", workoutController.edit);

router.post(
  "/users/:userId/workouts/create",
  helper.ensureAuthenticated,
  validation.validateWorkouts,
  workoutController.create
);
router.post(
  "/users/:userId/workouts/:id/update",
  validation.validateWorkouts,
  workoutController.update
);
router.post("/users/:userId/workouts/:id/destroy", workoutController.destroy);

module.exports = router;
