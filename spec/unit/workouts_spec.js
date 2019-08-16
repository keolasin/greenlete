const sequelize = require("../../src/db/models/index").sequelize;
const Workout = require("../../src/db/models").Workout;
const User = require("../../src/db/models").User;

describe("Workout", () => {
  beforeEach(done => {
    // init variables to use later
    this.workout;
    this.user;

    // start with clean database
    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: "Linda",
        email: "gymlife@email.com",
        password: "benchpress"
      }).then(user => {
        this.user = user; // storing the user

        // create a workout
        Workout.create({
          workoutType: "Biking",
          distance: 50,
          distanceUnits: "miles",
          duration: 125, // stored as minutes
          litterCount: 2,
          userId: this.user.id
        }).then(workout => {
          this.workout = workout;
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a workout with a workoutType, distance, distanceUnits, duration, litterCount, and associated user", done => {
      Workout.create({
        workoutType: "Running",
        distance: 6,
        distanceUnits: "miles",
        duration: 45, // stored as minutes
        litterCount: 3,
        userId: this.user.id
      })
        .then(workout => {
          expect(workout.workoutType).toBe("Running");
          expect(workout.distance).toBe(6);
          expect(workout.distanceUnits).toBe("miles");
          expect(workout.duration).toBe(45);
          expect(workout.litterCount).toBe(3);
          expect(workout.userId).toBe(this.user.id);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a workout with missing type, distance, distanceUnits, duration, or userId", done => {
      Workout.create({
        litterCount: 1,
        distance: 25
      })
        .then(workout => {
          // this should not execute since it did not create the workout,
          // set expectations in catch
        })
        .catch(err => {
          expect(err.message).toContain("Workout.workoutType cannot be null");
          expect(err.message).toContain("Workout.distanceUnits cannot be null");
          expect(err.message).toContain("Workout.duration cannot be null");
          done();
        });
    });
  });
  /*
  describe('#setUser()', () => {
    it('should associate a user and a workout together', (done) => {
      User.create({
        email: 'timmy@gmail.com',
        username: 'tommy',
        password: '123456789'
      })
      .then((newUser) => {
        expect(this.workout.userId).toBe(this.user.id);

        this.workout.setUser(newUser)
        .then((workout) => {
          expect(this.workout.userId).toBe(newUser.id);
          done();
        });
      });
    });
  });

  describe('#getUser()', () => {
    it('should return the associated user', (done) => {
      this.workout.getUser()
      .then((associatedUser) => {
        expect(associatedUser.username).toBe('Linda');
        done();
      });
    });
  });
  */
});
