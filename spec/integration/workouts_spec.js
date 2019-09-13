const request = require("request");
const server = require("../../src/server/server");
const base = "http://localhost:3306/api/users"; // back-end api
const view = "http://localhost:3000/users"; // front-end client path
const User = require("../../src/db/models").User;
const Workout = require("../../src/db/models").Workout;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : workouts", () => {
  beforeEach(done => {
    this.user;
    this.workout;
  });

  sequelize.sync({ force: true }).then(res => {
    User.create({
      email: "micah@library.com",
      password: "read4life",
      username: "micah"
    }).then(user => {
      this.user = user;

      Workout.create({
        workoutType: "Running",
        distance: 4,
        distanceUnits: "mi",
        duration: 30,
        litterCount: 2
      }).then(workout => {
        this.workout = workout;
        done();
      });
    });
  });

  describe("POST /api/users/:username/workouts/create", () => {
    it("should create a new workout", done => {
      const postOptions = {
        url: `${base}/${this.user.username}/workouts/create`,
        form: {
          workoutType: "Swimming",
          distance: 1,
          distanceUnits: "mi",
          duration: 45,
          litterCount: 1,
          userId: this.user.id
        }
      };

      request.post(postOptions, (err, res, body) => {
        expect(err).toBeNull();
        Workout.findOne({ where: { workoutType: "Swimming" } })
          .then(workout => {
            expect(workout).not.toBeNull();
            expect(workout.distance).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
});
