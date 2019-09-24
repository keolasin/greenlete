const request = require("request");
const server = require("../../src/server/server");
const base = "http://localhost:3306/api/users"; // back-end api
const view = "http://localhost:3000/users"; // front-end client path

const User = require("../../src/db/models").User;
const Workout = require("../../src/db/models").Workout;
const Litter = require("../../src/db/models").Litter;
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

describe("routes : litter", () => {
  describe("member user performing CRUD actions for litter", () => {
    beforeEach(done => {
      this.user;
      this.workout;
      this.litter;

      sequelize.sync({ force: true }).then(res => {
        User.create({
          email: "manu@stable.com",
          password: "cameraman",
          username: "Manu Chao"
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
            duration: 30,
            litterCount: 2
          }).then(workout => {
            this.workout = workout;
            console.log("workout created");

            Litter.create({
              latitude: 37.777285,
              longitude: -122.46426,
              quantity: 5,
              userId: this.user.id,
              workoutId: this.workout.id
            })
              .then(litter => {
                this.litter = litter;
                console.log("litter created");
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

    describe("POST /api/users/:username/litter/create", () => {
      it("should create a new litter item", done => {
        console.log(`creating litter`);
        const postOptions = {
          url: `${base}/${this.user.username}/litter/create`,
          form: {
            latitude: 37.777285,
            longitude: -122.46426,
            quantity: 2,
            userId: this.user.id,
            workoutId: this.workout.id
          }
        };

        request.post(postOptions, (err, req, res, body) => {
          expect(err).toBeNull();
          Workout.findOne({ where: { quantity: 2 } })
            .then(litter => {
              expect(litter).not.toBeNull();
              expect(litter.latitude).toBe("37.777285");
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
    describe("POST /api/users/:username/litter/id/update", () => {
      it("should update the litter with the given values", done => {
        const options = {
          url: `${base}/${this.user.username}/litter/${this.litter.id}/update`,
          form: {
            latitude: 50,
            longitude: -100,
            quantity: 1,
            userId: this.user.id
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Workout.findOne({
            where: { id: this.litter.id }
          }).then(litter => {
            expect(litter.quantity).toBe(1);
            expect(litter.latitude).toBe(50);
            done();
          });
        });
      });
    });
    describe("POST /api/users/:username/litter/:id/destroy", () => {
      it("should delete the selected litter item", done => {
        const options = {
          url: `${base}/${this.user.username}/litter/${this.litter.id}/destroy`
        };
        Workout.all().then(litter => {
          const litterCountBeforeDelete = litter.length;
          expect(litterCountBeforeDelete).toBe(1);

          request.post(options, (err, res, body) => {
            Workout.all().then(litter => {
              expect(litter.length).toBe(litterCountBeforeDelete - 1);
              done();
            });
          });
        });
      });
    });
  });
});
