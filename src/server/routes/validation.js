module.exports = {
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      // check request body for email and password validations
      req
        .checkBody("username", "must be at least 4 characters in length")
        .isLength({ min: 4 });
      req.checkBody("email", "must be valid").isEmail(); // must be email
      req
        .checkBody("password", "must be at least 6 characters in length")
        .isLength({ min: 6 }); // password must be at least 6 characters
    }

    const errors = req.validationErrors();

    if (errors) {
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
};
