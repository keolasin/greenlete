const workoutQueries = require("../../db/queries.workouts.js");

module.exports = {
  create(req, res, next) {
    console.log(
      req.body.workoutType,
      req.body.distance,
      req.body.distanceUnits,
      req.body.duration,
      req.body.litterCount,
      "userId: ",
      req.user.dataValues.id
    );

    let newWorkout = {
      workoutType: req.body.workoutType,
      distance: req.body.distance,
      distanceUnits: req.body.distanceUnits,
      duration: req.body.duration,
      litterCount: req.body.litterCount,
      userId: req.user.dataValues.id
    };

    workoutQueries.addWorkout(newWorkout, (err, workout) => {
      if (err) {
        res.json({
          error: err,
          message: "Problem adding workout, try again.",
          redirectPath: `/users/${req.userData}/addWorkout`
        });
        console.log(`error hit: ${err}`);
      } else {
        console.log(`success`);
        console.log(workout);
        res.json({
          workoutData: workout,
          redirectPath: `/users/workouts/${workout.id}`
        });
      }
    });
  },

  showOne(req, res, next) {
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

  showMany(req, res, next) {
    workoutQueries.getUserWorkouts(req.params.id, (err, workouts) => {
      if (err || workouts == null) {
        res.statusCode(404);
      } else {
        res.json({ workouts }); // return array of workout objects
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
