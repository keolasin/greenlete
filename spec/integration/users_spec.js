const request = require("request");
const server = require("../../src/server/server");
const base = "http://localhost:3306/api/users/"; // express api
const view = "http://localhost:3000/users/"; // react client path
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
  // start with empty database for test suite
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("POST /users", () => {
    //confirm form with valid values for attributes to create user
    it("should create a new user with valid values and redirect", done => {
      const options = {
        url: `${base}register`,
        form: {
          email: "athlete@greenlete.com",
          password: "123456789"
        }
      };

      request.post(options, (err, res, body) => {
        // when response returns, check users model table for a user w/ given email and confirm it has an ID
        User.findOne({ where: { email: "athlete@greenlete.com" } })
          .then(user => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("athlete@greenlete.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });

    // submit a request with invalid values and expect NOT to create user
    it("should not create a new user with invalid attributes and redirect", done => {
      request.post(
        {
          url: `${base}register`,
          form: {
            email: "negative",
            password: "123456789"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "negative" } })
            .then(user => {
              expect(user).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });
});
