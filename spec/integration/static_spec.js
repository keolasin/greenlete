const request = require("request");
const server = require("../../src/server/server.js");
const base = "http://localhost:3306/api/";

describe("routes : static", () => {
  describe("GET /testApi", () => {
    it("should return a status code 200 and a test JSON object in the body of the response", done => {
      request.get(`${base}testApi`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
});
