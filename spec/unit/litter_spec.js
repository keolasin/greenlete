const sequelize = require("../../src/db/models/index").sequelize;
const Workout = require("../../src/db/models").Workout;
const User = require("../../src/db/models").User;
const Litter = require("../../src/db/models").Litter;

describe("Litter", () => {
  beforeEach(done => {
    // init variables to use later
    this.workout;
    this.litter;
    this.user;

    // start with clean database
    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: "Marty",
        email: "Martian@email.com",
        password: "MarsBarsAres"
      }).then(user => {
        this.user = user; // storing the user

        // create a workout
        Workout.create(
          {
            workoutType: "Running",
            distance: 2,
            duration: 125, // stored as minutes
            litterCount: 1,
            userId: this.user.id,
            litter: [
              {
                latitude: 37.777285,
                longitude: -122.46426,
                quantity: 1,
                isClean: false,
                userId: this.user.id
              }
            ]
          },
          {
            include: {
              model: Litter,
              as: "litter"
            }
          }
        ).then(workout => {
          this.workout = workout;
          this.litter = workout.litter[0];
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a litter object with a latitude, longitude, quantity, isClean, and userId attributes associated to a workout", done => {
      Litter.create({
        latitude: 37.777285,
        longitude: -122.46426,
        quantity: 1,
        userId: this.user.id,
        workoutId: this.workout.id
      })
        .then(litter => {
          expect(litter.latitude).toBe("37.777285");
          expect(litter.longitude).toBe("-122.46426");
          expect(litter.quantity).toBe(1);
          expect(litter.userId).toBe(this.user.id);
          expect(litter.workoutId).toBe(this.workout.id);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a litter item with missing latitude, longitude, quantity, userId, or workoutId", done => {
      Litter.create({
        quantity: 2
      })
        .then(litter => {
          // this should not execute since it did not create the litter item,
          // set expectations in catch
        })
        .catch(err => {
          expect(err.message).toContain("Litter.latitude cannot be null");
          expect(err.message).toContain("Litter.longitude cannot be null");
          done();
        });
    });
  });
});
