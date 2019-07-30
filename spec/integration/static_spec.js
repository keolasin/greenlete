const request = require("request");
const server = require("../../src/server/server.js");
const base = "http://localhost:5000/testApi";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return a status code 200 and a test JSON object in the body of the response", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("bob");
        done();
      });
    });
  });
});
