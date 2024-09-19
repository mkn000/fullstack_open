const blogsRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware.js");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const user = await User.findById(request.user);
  const blog = new Blog({ ...request.body, user: user._id });

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else if (request.user !== user._id.toString()) {
    response.status(403).json({ error: "unauthorized access" });
  } else {
    const result = await blog.save();
    await Blog.populate(result, { path: "user" });

    user.blogs = user.blogs.concat(result._id);
    user.save();

    response.status(201).json(result);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === request.user) {
    await Blog.findByIdAndDelete(request.params.id);
    await User.findByIdAndUpdate(request.user, {
      $pull: { blogs: request.params.id },
    });
    response.status(204).end();
  } else {
    response.status(403).json({ error: "unauthorized access" });
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true },
  ).populate("user");
  response.json(updated);
});

module.exports = blogsRouter;
