// handles authentication using passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const StravaStrategy = require("passport-strava").Strategy;
const User = require("../../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app) {
    // init passport, uses sessions to keep track of auth users
    app.use(passport.initialize());
    app.use(passport.session());

    // uses local strategy, looks for props of 'username' and 'password' in req.body normally, so use option of usernameField instead
    passport.use(
      new LocalStrategy(
        {
          usernameField: "username" // default value
        },
        (username, password, done) => {
          User.findOne({
            where: { username: username }
          }).then(user => {
            // if we find no user with provided email, or pw doesnt match, return error
            if (!user || !authHelper.comparePass(password, user.password)) {
              return done(null, false, {
                message: "Invalid username or password"
              });
            }
            // else, return the authenticated user
            return done(null, user);
          });
        }
      )
    );

    // strava strategy
    passport.use(
      new StravaStrategy(
        {
          clientID: process.env.STRAVA_CLIENT_ID,
          clientSecret: process.env.STRAVA_CLIENT_SECRET,
          callbackURL: "/api/users/sign_in/strava/return"
        },
        (accessToken, refreshToken, profile, callback) => {
          User.findOrCreate({ where: { stravaId: profile.id } }).then(user => {
            return done(null, user);
          });
        }
      )
    );
    // stores authenticated user.id and stores in session
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

    // takes the user.id stored in the session and returns user associated with it
    passport.deserializeUser((id, callback) => {
      User.findById(id)
        .then(user => {
          callback(null, user);
        })
        .catch(err => {
          callback(err, user);
        });
    });
  }
};
