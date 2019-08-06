const userQueries = require("../../db/queries.users.js");
const passport = require("passport");

module.exports = {
  create(req, res, next) {
    // pull values from req.body and add them to a newUser object
    let newUser = {
      email: req.body.email,
      password: req.body.password
    };

    // call createUser from userQueries, passing in our newUser obj and callback()
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        res.redirect("/users/sign_up");
      } else {
        // if user created successfully, auth user by calling passport.authenticate()
        // redirects to landing, uses function in passport-config.js where local strategy defined
        passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      }
    });
  }
};
