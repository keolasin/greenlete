// require Workout model and User model
const Workout = require("./models").Workout;
const User = require("./models").User;

module.exports = {
  addWorkout(newWorkout, callback) {
    return Workout.create(newWorkout)
      .then(workout => {
        callback(null, workout);
      })
      .catch(err => {
        callback(err);
      });
  },
  getWorkout(id, callback) {
    return Workout.findById(id)
      .then(workout => {
        callback(null, workout);
      })
      .catch(err => {
        callback(err);
      });
  },

  getUserWorkouts(id, callback) {
    let result = {};

    User.findById(id).then(user => {
      if (!user) {
        // 404 error if user not found
        callback(404);
      } else {
        // user found
        result["user"] = user; // store user in result as property

        Workout.scope({ method: ["lastTenFor", id] })
          .findAll() //find last ten workouts for user using scope
          .then(workouts => {
            result["workouts"] = workouts; // store in result object
            console.log(result.workouts);
            callback(null, result); // return the result object
          })
          .catch(err => {
            callback(err); // return the error if the query fails
          });
      }
    });
  },

  updateWorkout(id, updatedWorkout, callback) {
    return Workout.findById(id).then(workout => {
      if (!workout) {
        return callback("Workout not found");
      }

      workout
        .update(updatedWorkout, {
          fields: Object.keys(updatedWorkout)
        })
        .then(() => {
          callback(null, workout);
        })
        .catch(err => {
          callback(err);
        });
    });
  },

  deleteWorkout(id, callback) {
    return Workout.destroy({
      where: { id }
    })
      .then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  }
};
