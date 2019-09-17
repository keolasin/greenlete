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

            callback(null, result); // return the result object
          })
          .catch(err => {
            callback(err); // return the error if the query fails
          });
      }
    });
  },

  updateWorkout(id, updatedWorkout, callback) {
    // id should be workout.id from controller
    let result = {};
    return Workout.findById(id).then(workout => {
      // find given workout in database
      if (!workout) {
        // not found
        return callback("Workout not found");
      }

      workout
        .update(updatedWorkout, {
          fields: Object.keys(updatedWorkout) // update database item given new form info
        })
        .then(() => {
          result["workout"] = workout; // return updated workout to controller
          callback(null, result);
        })
        .catch(err => {
          callback(err);
        });
    });
  },

  deleteWorkout(id, callback) {
    // expect id to be workout.id passed from controller
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
