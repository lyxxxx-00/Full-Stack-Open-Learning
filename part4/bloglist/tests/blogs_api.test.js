const { test, after, beforeEach } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({ username: "testuser", password: "password" });
  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: user._id });
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("property id is defined", async () => {
  const res = await api.get("/api/blogs");
  res.body.forEach((blog) => {
    assert(blog.id);
    assert(!blog._id);
  });
});

test("a valid blog can be added", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const newBlog = {
    title: "New Blog",
    author: "John Doe",
    url: "https://www.example3.com",
    likes: 30,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((blog) => blog.title);

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
  assert(titles.includes("New Blog"));
});

test("likes property defaults to 0", async () => {
  const newBlog = {
    title: "Nonlike Blog",
    author: "John Doe",
    url: "https://www.example4.com",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);
  assert.strictEqual(response.body.likes, 0);
});

test("title and url properties are required", async () => {
  const newBlog = {
    author: "John Doe",
    likes: 30,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  console.log(`Deleting blog with ID: ${blogToDelete.id}`);
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((blog) => blog.title);

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  assert(!titles.includes(blogToDelete.title));
});

test("a blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const newLikes = 100;

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: newLikes })
    .expect(200);

  assert.strictEqual(updatedBlog.body.likes, newLikes);
});

after(async () => mongoose.connection.close());
