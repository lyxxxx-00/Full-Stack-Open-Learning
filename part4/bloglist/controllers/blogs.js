const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  const detoken = jwt.verify(req.token, process.env.SECRET);
  if (!detoken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(detoken.id);

  const blog = new Blog({ ...req.body, user: user._id });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    if (!savedBlog.likes) {
      savedBlog.likes = 0;
    }
    if (!savedBlog.title || !savedBlog.url) {
      return res.status(400).json({ error: "title and url missing" });
    }
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  try {
    if (user.id.toString() !== blog.user.toString()) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const result = await Blog.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(204).end();
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const blog = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
