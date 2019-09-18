const workoutQueries = require("../../db/queries.workouts.js");

module.exports = {
  create(req, res, next) {
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
          redirect: `/users/${req.user.username}/addWorkout`
        });
        console.log(`error hit: ${err}`);
      } else {
        res.json({
          workoutData: workout,
          redirect: `/users/${req.user.username}/workouts`
        });
      }
    });
  },

  showOne(req, res, next) {
    // single workout
    workoutQueries.getWorkout(req.user.id, (err, result) => {
      if (err || result.workout == null) {
        console.log(err);
        res.statusCode(404);
      } else {
        res.json(result.workout);
      }
    });
  },

  showMany(req, res, next) {
    // last 10 workouts
    workoutQueries.getUserWorkouts(req.user.id, (err, result) => {
      if (err || result.workouts == undefined) {
        console.log(err);
        // log any error to the console
      } else {
        res.json(result.workouts); // return array of workout objects
      }
    });
  },

  update(req, res, next) {
    workoutQueries.updateWorkout(req.params.id, req.body, (err, result) => {
      if (err || result.workout == null) {
        console.log(err);
        res.json({ redirect: `/users/${req.user.username}/workouts` });
      } else {
        console.log("Successfully updated");
        res.json({
          redirect: `/users/${req.user.username}/workouts`
        });
      }
    });
  },

  destroy(req, res, next) {
    workoutQueries.deleteWorkout(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        console.log(err);
        res.json({
          errorMessage: err,
          redirect: `/users/${req.user.username}/workouts`
        });
      } else {
        res.json({ redirect: `/users/${req.user.username}/workouts` });
      }
    });
  }
};
