module.exports = {
  init(app) {
    // require routes from /routes
    const staticRoutes = require("../routes/static");
    const testApiRoute = require("../routes/test");
    const userRoutes = require("../routes/users");
    const workoutRoutes = require("../routes/workouts");

    // instruct app to use routes required above
    app.use(staticRoutes);
    app.use(testApiRoute);
    app.use(userRoutes);
    app.use(workoutRoutes);
  }
};
