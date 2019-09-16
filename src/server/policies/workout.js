// require our application.js policy so we can extend it
const ApplicationPolicy = require("./application");

module.exports = class WorkoutPolicy extends ApplicationPolicy {};
