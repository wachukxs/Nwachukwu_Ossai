import "dotenv/config";
import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("post CRUD", () => {
  it("add a new post to the app with wrong body", (done) => {
    const TEST_BODY = {
      title: "Hello there!",
      content:
        "This is meant to be a long post about something random, important, or fun.",
      sth: "else",
    };
    request(app)
      .post("/api/v1/post")
      .set("Accept", "application/json")
      .send(TEST_BODY)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.message).toBeTruthy(); // "There is an issue with the data you provided"
        expect(response.body.error).toBeTruthy();
        expect(response.body.error._original).toEqual(TEST_BODY);
      })
      .expect(400, done);
  });

  it("delete a post", (done) => {
    const WRONG_ID = "45str";
    request(app)
      .delete("/api/v1/post/" + WRONG_ID)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.message).toBeTruthy(); // "There is an issue with the data you provided"
        expect(response.body.error).toBeTruthy();
        expect(response.body.error._original.id).toEqual(WRONG_ID);
      })
      .expect(400, done);
  });

  it("wrong param id type", (done) => {
    const WRONG_ID = "str";
    request(app)
      .get("/api/v1/post/" + WRONG_ID)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.message).toBeTruthy(); // "There is an issue with the data you provided"
        expect(response.body.error).toBeTruthy();
        expect(response.body.error._original.id).toEqual(WRONG_ID);
      })
      .expect(400, done);
  });
});
