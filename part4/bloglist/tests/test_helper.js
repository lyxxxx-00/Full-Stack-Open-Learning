const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "First Blog",
    author: "John Doe",
    url: "https://www.example1.com",
    likes: 10,
  },
  {
    title: "Second Blog",
    author: "Jane Doe",
    url: "https://www.example2.com",
    likes: 20,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
