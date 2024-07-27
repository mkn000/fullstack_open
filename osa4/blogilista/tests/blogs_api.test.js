const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
];
const newBlog = {
  _id: "5a422ba71b54a676234d17fb",
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 0,
  __v: 0,
};

const blogWithNoLikes = {
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  __v: 0,
};

const blogWithNoTitle = {
  _id: "5a422bc61b54a676234d17fc",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  __v: 0,
};

const blogWithNoUrl = {
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  __v: 0,
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe("api GET", () => {
  test("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, blogs.length);
  });

  test("has id field of type string", async () => {
    const response = await api.get("/api/blogs");
    const id = response.body.map((resp) => resp.id);

    assert.notStrictEqual(id.length, 0);
    assert.strictEqual(typeof id[0], "string");
  });
});

describe("api POST", () => {
  test("adding valid blog", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const title = response.body.map((resp) => resp.title);

    assert.strictEqual(response.body.length, blogs.length + 1);
    assert(title.includes(newBlog.title));
  });

  test("likes has default value of 0", async () => {
    await api
      .post("/api/blogs")
      .send(blogWithNoLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get(`/api/blogs/${blogWithNoLikes._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("blog with no title returns 400", async () => {
    await api.post("/api/blogs").send(blogWithNoTitle).expect(400);
  });

  test("blog with no url returns 400", async () => {
    await api.post("/api/blogs").send(blogWithNoUrl).expect(400);
  });
});

describe("api DELETE", () => {
  test("blog can be deleted by id", async () => {
    await api.delete(`/api/blogs/${blogs[0]._id}`).expect(204);

    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, blogs.length - 1);
  });
});

describe("api PUT", () => {
  test("blog can be updated", async () => {
    const updated = { ...blogs[0], likes: 140 };
    const response = await api
      .put(`/api/blogs/${blogs[0]._id}`)
      .send(updated)
      .expect(200);

    assert.strictEqual(response.body.likes, 140);
  });
});

after(async () => {
  await mongoose.connection.close();
});
