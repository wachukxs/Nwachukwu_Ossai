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
  let TEST_POST_ID_TO_DELETE: number;
  it("add a new post to the app", (done) => {
    const TEST_BODY = {
      title: "Hello there!",
      content:
        "This is meant to be a long post about something random, important, or fun.",
    };
    request(app)
      .post("/api/v1/post")
      .set("Accept", "application/json")
      .send(TEST_BODY)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.post.title).toEqual(TEST_BODY.title);
        expect(response.body.post.content).toEqual(TEST_BODY.content);
        expect(typeof response.body.post.id).toBe("number");

        TEST_POST_ID_TO_DELETE = response.body.post.id
      })
      .expect(201, done);
  });

  it("fetch a sample post", (done) => {
    request(app)
      .get("/api/v1/post/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.post.title).toBeTruthy();
        expect(response.body.post.content).toBeTruthy();
        expect(typeof response.body.post.id).toBe("number");
        expect(response.body.post.id).toEqual(1);
      })
      .expect(200, done);
  });

  it("fetch all posts", (done) => {
    request(app)
      .get("/api/v1/post/all")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(Array.isArray(response.body.posts)).toBeTruthy();

        expect(response.body.posts?.[0].title).toBeTruthy();
        expect(response.body.posts?.[0].content).toBeTruthy();
        expect(typeof response.body.posts?.[0].id).toBe("number");
      })
      .expect(200, done);
  });

  it("delete a post", (done) => {
    request(app)
      .delete("/api/v1/post/" + TEST_POST_ID_TO_DELETE)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.message).toBeTruthy(); // "Post deleted"
      })
      .expect(200, done);
  });

  it("is post really deleted?", (done) => {
    request(app)
      .delete("/api/v1/post/" + TEST_POST_ID_TO_DELETE)
      .expect("Content-Type", /json/)
      .expect(410, done);
  });

  it("get deleted post", (done) => {
    request(app)
      .get("/api/v1/post/" + TEST_POST_ID_TO_DELETE)
      .expect(204, done);
  });
});
