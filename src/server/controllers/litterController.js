const litterQueries = require("../../db/queries.litter.js");

module.exports = {
  create(req, res, next) {
    let newLitter = {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      quantity: req.body.quantity,
      userId: req.user.dataValues.id
    };

    litterQueries.addLitter(newLitter, (err, litter) => {
      if (err) {
        res.json({
          error: err,
          message: "Problem adding litter, try again.",
          redirect: `/users/${req.user.username}/`
        });
        console.log(`error hit: ${err}`);
      } else {
        res.json({
          litterData: litter,
          redirect: `/users/${req.user.username}/`
        });
      }
    });
  },

  showOne(req, res, next) {
    // single litter
    litterQueries.getLitter(req.user.id, (err, result) => {
      if (err || result.litter == null) {
        console.log(err);
        res.statusCode(404);
      } else {
        res.json(result.litter);
      }
    });
  },

  showMany(req, res, next) {
    // last 10 litters
    litterQueries.getUserLitter(req.user.id, (err, result) => {
      if (err || result.litters == undefined) {
        console.log(err);
        // log any error to the console
      } else {
        res.json(result.litters); // return array of litter objects
      }
    });
  },

  update(req, res, next) {
    litterQueries.updateLitter(req.params.id, req.body, (err, result) => {
      if (err || result.litter == null) {
        console.log(err);
        res.json({ redirect: `/users/${req.user.username}/litter` });
      } else {
        console.log("Successfully updated");
        res.json({
          redirect: `/users/${req.user.username}/litter`
        });
      }
    });
  },

  destroy(req, res, next) {
    litterQueries.deleteLitter(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        console.log(err);
        res.json({
          errorMessage: err,
          redirect: `/users/${req.user.username}/litter`
        });
      } else {
        res.json({ redirect: `/users/${req.user.username}/litter` });
      }
    });
  }
};
