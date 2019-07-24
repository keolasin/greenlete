module.exports = {
  init(app) {
    // require routes from /routes
    const staticRoutes = require("../routes/static");

    // instruct app to use routes required above
    app.use(staticRoutes);
  }
};
