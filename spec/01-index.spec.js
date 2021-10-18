const request = require("supertest");

const app = require("../app");

const TIME_OUT = 5000;

describe("index controller test", () => {
  jest.setTimeout(TIME_OUT);

  describe("endpoint GET /", () => {
    test("it should response ok", async () => {
      await request(app)
        .get("/")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect({ result: "ok" });
    });
  });

  describe("endpoint default router", () => {
    test("it should response error for invalid url", async () => {
      await request(app)
        .get("/invalid")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect({ error: "Not Found" });
    });
  });
});
