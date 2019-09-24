module.exports = {
  init(app) {
    // require routes from /routes
    const staticRoutes = require("../routes/static");
    const testApiRoute = require("../routes/test");
    const userRoutes = require("../routes/users");
    const workoutRoutes = require("../routes/workouts");
    const litterRoutes = require("../routes/litter");

    // testing case, use fake auth
    if (process.env.NODE_ENV === "test") {
      const mockAuth = require("../../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    // instruct app to use routes required above
    app.use(staticRoutes);
    app.use(testApiRoute);
    app.use(userRoutes);
    app.use(workoutRoutes);
    app.use(litterRoutes);
  }
};
