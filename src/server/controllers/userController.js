const userQueries = require("../../db/queries.users.js");
const passport = require("passport");

module.exports = {
  // user sign up
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
  },

  // user sign in
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (!req.user) {
        res.redirect("/users/sign_in");
      } else {
        res.redirect("/");
      }
    });
  },

  signOut(req, res, next) {
    req.logout();
    res.redirect("/");
  }
};
