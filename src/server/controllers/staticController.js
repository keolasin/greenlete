module.exports = {
  index(req, res, next) {
    res.sendFile(path.join(__dirname, "greenlete/build", "index.html"));
  }
};
