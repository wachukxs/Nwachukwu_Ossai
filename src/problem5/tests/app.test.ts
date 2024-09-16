import "dotenv/config";
import request from "supertest";
import app from "../src/app";

describe("app", () => {
  it("responds with a not found message", (done) => {
    request(app)
      .get("/random-url-that-does-not-exists")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done);
  });

  it("responds with a json message", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "Hey 99Tech!",
        },
        done
      );
  });
});
