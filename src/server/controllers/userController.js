const userQueries = require("../../db/queries.users.js");
const passport = require("passport");

module.exports = {
  // check if user is signed in
  check(req, res, next) {
    if (req.user) {
      res.json({ user: req.user.id });
    } else {
      res.json({ user: null });
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
        console.log(err);
        res.json({ createError: err, notice: "Unable to sign up, try again!" });
      } else {
        // if user created successfully, auth user by calling passport.authenticate()
        // redirects to dashboard, uses function in passport-config.js where local strategy defined
        passport.authenticate("local")(req, res, () => {
          res.json({ redirect: `/users/${req.user.id}/how_to` });
        });
      }
    });
  },

  // user sign in
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (!req.user) {
        // send error message and redirect to sign in page
        console.log(`Error during sign-in`);
        res.json({
          notice: "Unable to sign-in, try again!",
          redirect: "/users/sign_in"
        });
      } else {
        res.json({ redirect: `/users/${req.user.id}/dashboard` });
      }
    });
  },

  // user logout
  signOut(req, res, next) {
    if (req.user) {
      req.logout();
      res.send({ user: null });
    } else {
      res.send({ notice: "No user to log out" });
    }
  }
};
