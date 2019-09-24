// require Litter, Litter, and User model
const Litter = require("./models").Litter;
const Workout = require("./models").Litter;
const User = require("./models").User;

module.exports = {
  addLitter(newLitter, callback) {
    return Litter.create(newLitter)
      .then(litter => {
        callback(null, litter);
      })
      .catch(err => {
        callback(err);
      });
  },
  getLitter(id, callback) {
    return Litter.findById(id) // find specific litter item by id in database
      .then(litter => {
        callback(null, litter);
      })
      .catch(err => {
        callback(err);
      });
  },

  getUserLitter(id, callback) {
    // look for last twenty litter objects for user
    let result = {};

    User.findById(id).then(user => {
      if (!user) {
        // 404 error if user not found
        callback(404);
      } else {
        // user found
        result["user"] = user; // store user in result as property

        Litter.scope({ method: ["lastTwentyFor", id] })
          .findAll() //find last twenty litter items for user using scope
          .then(manyLitter => {
            result["manyLitter"] = manyLitter; // store in result object

            callback(null, result); // return the result object
          })
          .catch(err => {
            callback(err); // return the error if the query fails
          });
      }
    });
  },

  updateLitter(id, updatedLitter, callback) {
    // id should be litter.id from controller
    let result = {};
    return Litter.findById(id).then(litter => {
      // find given litter in database
      if (!litter) {
        // not found
        return callback("Litter not found");
      }

      litter
        .update(updatedLitter, {
          fields: Object.keys(updatedLitter) // update database item given new form info
        })
        .then(() => {
          result["litter"] = litter; // return updated litter to controller
          callback(null, result);
        })
        .catch(err => {
          callback(err);
        });
    });
  },

  deleteLitter(id, callback) {
    // expect id to be litter.id passed from controller
    return Litter.destroy({
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
