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
