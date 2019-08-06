const bcrypt = require("bcryptjs");

module.exports = {
  // redirect to sign in page if not authenticated, else next()
  ensureAuthenticated(req, res, next) {
    if (!req.user) {
      return res.redirect("/users/sign_in");
    } else {
      next();
    }
  },

  // compare against plain-text pass sent by req against hashed pw retrieved by strategy, true if match/ false if not
  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
};
