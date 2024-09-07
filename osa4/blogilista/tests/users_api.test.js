const { test, describe, after, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

describe("api/users POST", async () => {
  before(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const newUser = {
      username: "hellas",
      name: "Arto Hellas",
      password: "password",
    };

    const beforeCreation = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, beforeCreation.body.length + 1);

    const usernames = response.body.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails when invalid password", async () => {
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "1",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
  test("creation fails when username missing", async () => {
    const newUser = {
      name: "Matti Luukkainen",
      password: "salainen",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(
      response.body.error.includes("Path `username` is required."),
      true,
    );
  });

  test("creation fails when username is not unique", async () => {
    const newUser = {
      username: "root",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(
      response.body.error.includes("expected `username` to be unique"),
      true,
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
