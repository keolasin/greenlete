const request = require("request");
const server = require("../../src/server/server");
const base = "http://localhost:3306/api/users"; // back-end api
const view = "http://localhost:3000/users"; // front-end client path

const User = require("../../src/db/models").User;
const Workout = require("../../src/db/models").Workout;
const sequelize = require("../../src/db/models/index").sequelize;

function authorizeUser(role, username, done) {
  // helper function to create and auth new user
  User.create({
    email: `#{role}@example.com`,
    password: "read4life",
    username: username,
    role: role
  }).then(user => {
    request.get(
      {
        url: "http://localhost:3306/auth/fake",
        form: {
          role: user.role,
          userId: user.id,
          email: user.email,
          username: user.username
        }
      },
      (err, res, body) => {
        done();
      }
    );
  });
}

describe("routes : workouts", () => {
  describe("member user performing CRUD actions for workouts", () => {
    beforeEach(done => {
      this.user;
      this.workout;

      sequelize.sync({ force: true }).then(res => {
        User.create({
          email: "micah@library.com",
          password: "read4life",
          username: "micah"
        }).then(user => {
          request.get(
            {
              // mock auth
              url: "http://localhost:3306/auth/fake",
              form: {
                role: user.role,
                userId: user.id,
                email: user.email,
                username: user.username
              }
            },
            (err, res, body) => {
              err ? console.log(`error: ${err}`) : null;
              done();
            }
          );
          this.user = user;
          console.log("user created");

          Workout.create({
            workoutType: "Running",
            distance: 4,
            distanceUnits: "mi",
            duration: 30,
            litterCount: 2
          }).then(workout => {
            this.workout = workout;
            console.log("workout created");
          });
        });
      });
    });

    describe("POST /api/users/:username/workouts/create", () => {
      it("should create a new workout", done => {
        console.log(`creating workout`);
        const postOptions = {
          url: `${base}/${this.user.username}/workouts/${this.workout.id}/update`,
          form: {
            workoutType: "Swimming",
            distance: 1,
            distanceUnits: "mi",
            duration: 45,
            litterCount: 1
          }
        };

        request.post(postOptions, (err, req, res, body) => {
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

    // edit/update
    describe("POST /api/users/:username/workouts/update", () => {
      it("should update the workout with the given values", done => {
        const options = {
          url: `${base}/${this.user.username}/workouts/update`,
          form: {
            workoutType: "Swimming",
            distance: 2,
            distanceUnits: "mi",
            duration: 60,
            litterCount: 1
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Workout.findOne({
            where: { id: this.workout.id }
          }).then(workout => {
            expect(workout.distance).toBe(2);
            expect(workout.duration).toBe(60);
            done();
          });
        });
      });
    });
  });
});
