module.exports = {
  init(app) {
    // require routes from /routes
    const staticRoutes = require("../routes/static");
    const testApiRoute = require("../routes/test");

    // instruct app to use routes required above
    app.use(staticRoutes);
    app.use(testApiRoute);
  }
};
