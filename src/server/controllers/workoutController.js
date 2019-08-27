const workoutQueries = require("../../db/queries.users.js");

module.exports = {
  create(req, res, next) {
    let newWorkout = {
      workoutType: req.body.workoutType,
      distance: req.body.distance,
      distanceUnits: req.params.distanceUnits,
      duration: req.params.duration,
      litterCount: req.params.litterCount,
      userId: req.user.id
    };

    workoutQueries.addWorkout(newWorkout, (err, workout) => {
      if (err) {
        res.json({
          error: err,
          message: "Problem adding workout, try again.",
          redirectPath: `/users/${req.user.username}/addWorkout`
        });
        console.log(`error hit: ${err}`);
      } else {
        console.log(`success`);
        res.statusCode(303).json({
          workoutData: workout,
          redirectPath: `/users/workouts/${workout.id}`
        });
      }
    });
  },

  show(req, res, next) {
    workoutQueries.getWorkout(req.params.id, (err, workout) => {
      if (err || workout == null) {
        res.statusCode(404);
      } else {
        res.json({
          workoutData: workout,
          redirectPath: `/users/workouts/${workout.id}`
        });
      }
    });
  },

  edit(req, res, next) {
    workoutQueries.getWorkout(req.params.id, (err, workout) => {
      if (err || workout == null) {
        res.statusCode(404).json({ redirectPath: "/" });
      } else {
        res.json({
          workoutData: workout,
          redirectPath: `/users/workouts/${workout.id}/edit`
        });
      }
    });
  },

  update(req, res, next) {
    workoutQueries.updateWorkout(req.params.id, req.body, (err, workout) => {
      if (err || workout == null) {
        res
          .statusCode(404)
          .json({ redirectPath: `/users/workouts/${workout.id}/edit` });
      } else {
        res.json({
          workoutData: workout,
          redirectPath: `/users/workouts/${workout.id}`
        });
      }
    });
  },

  destroy(req, res, next) {
    workoutQueries.deleteWorkout(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.statusCode(500).json({ redirectPath: `/users/workouts/` });
      } else {
        res
          .statusCode(303)
          .json({ redirectPath: `/users/workouts/${workout.id}` });
      }
    });
  }
};
