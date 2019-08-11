const userQueries = require("../../db/queries.users.js");
const passport = require("passport");

module.exports = {
  // check if user is signed in
  check(req, res, next) {
    console.log(req.user);
    if (req.user) {
      res.send({ user: req.user });
    } else {
      res.send({ user: null });
    }
  },

  // user sign up
  create(req, res, next) {
    // pull values from req.body and add them to a newUser object
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    // call createUser from userQueries, passing in our newUser obj and callback()
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        res.redirect("/users/sign_up");
      } else {
        // if user created successfully, auth user by calling passport.authenticate()
        // redirects to dashboard, uses function in passport-config.js where local strategy defined
        passport.authenticate("local")(req, res, () => {
          res.redirect(`/users/${user.id}/dashboard/how_to`);
        });
      }
    });
  },

  // user sign in
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (!req.user) {
        // send error message and redirect to sign in page
        res.redirect("/users/sign_in");
      } else {
        res.redirect(`/users/${user.id}/dashboard`);
      }
    });
  },

  signOut(req, res, next) {
    req.logout();
    res.redirect("/");
  }
};
