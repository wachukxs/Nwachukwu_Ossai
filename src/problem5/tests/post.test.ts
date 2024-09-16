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

const BASE_URL = '/api/v1/post'

describe("post CRUD", () => {
  let TEST_POST_ID_TO_DELETE: number;
  it("add a new post to the app", (done) => {
    const TEST_BODY = {
      title: "Hello there!",
      content:
        "This is meant to be a long post about something random, important, or fun.",
    };
    request(app)
      .post(BASE_URL)
      .set("Accept", "application/json")
      .send(TEST_BODY)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.post.title).toEqual(TEST_BODY.title);
        expect(response.body.post.content).toEqual(TEST_BODY.content);
        expect(typeof response.body.post.id).toBe("number");

        TEST_POST_ID_TO_DELETE = response.body.post.id;
      })
      .expect(201, done);
  });

  it("fetch a sample post", (done) => {
    request(app)
      .get(BASE_URL + "/1")
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
      .get(BASE_URL + "/all")
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
      .delete(BASE_URL + `/${TEST_POST_ID_TO_DELETE}`)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body.message).toBeTruthy(); // "Post deleted"
      })
      .expect(200, done);
  });

  it("is post really deleted?", (done) => {
    request(app)
      .delete(BASE_URL + `/${TEST_POST_ID_TO_DELETE}`)
      .expect("Content-Type", /json/)
      .expect(410, done);
  });

  it("get deleted post", (done) => {
    request(app)
      .get(BASE_URL + `/${TEST_POST_ID_TO_DELETE}`)
      .expect(204, done);
  });
});

describe("post filtering", () => {
  const TEST_BODY = {
    title: "Unique!",
    content: "99Tech is awesome tech!",
  };

  it("send test post", (done) => {
    request(app)
      .post(BASE_URL)
      .set("Accept", "application/json")
      .send(TEST_BODY)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });

  it("fetch all posts, with title", (done) => {
    request(app)
      .get(BASE_URL + "/search?title=" + TEST_BODY.title)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(Array.isArray(response.body.posts)).toBeTruthy();

        expect(response.body.posts?.[0].title).toBeTruthy();
        expect(response.body.posts?.[0].content).toBeTruthy();
        expect(typeof response.body.posts?.[0].id).toBe("number");
      })
      .expect(200, done);
  });

  it("fetch all posts, with content", (done) => {
    request(app)
      .get(BASE_URL + "/search?content=" + TEST_BODY.content.slice(0, 5))
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(Array.isArray(response.body.posts)).toBeTruthy();

        expect(response.body.posts?.[0].title).toBeTruthy();
        expect(response.body.posts?.[0].content).toBeTruthy();
        expect(typeof response.body.posts?.[0].id).toBe("number");
      })
      .expect(200, done);
  });

  it("fetch all posts, with title and content", (done) => {
    const query = `${BASE_URL}/search?content=${TEST_BODY.content.slice(
      0,
      5
    )}&title=${TEST_BODY.title}`;
    request(app)
      .get(query)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(Array.isArray(response.body.posts)).toBeTruthy();

        expect(response.body.posts?.[0].title).toBeTruthy();
        expect(response.body.posts?.[0].content).toBeTruthy();
        expect(typeof response.body.posts?.[0].id).toBe("number");
      })
      .expect(200, done);
  });
});
