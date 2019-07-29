module.exports = {
  test(req, res, next) {
    res.json([
      {
        id: 1,
        name: "tim"
      },
      {
        id: 2,
        name: "bobby"
      }
    ]);
  }
};
