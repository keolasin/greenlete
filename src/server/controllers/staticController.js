const path = require("path");
module.exports = {
  index(req, res, next) {
    res.sendFile(
      path.join(__dirname, "../../../greenlete/build", "index.html")
    );
  },
  refresh(req, res, next) {
    res.sendFile(
      path.join(__dirname, "../../../greenlete/build", "index.html"),
      err => {
        // error handler function
        if (err) {
          // send error back in response
          res.status(500).send(err);
        }
      }
    );
  }
};
