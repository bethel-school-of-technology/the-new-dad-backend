const router = require("express").Router();
let Blog = require("../models/blog.model");

router.route("/").get((req, res) => {
  Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newBlog = new Blog({
    username,
    title,
    description,
    date
  });

  newBlog
    .save()
    .then(() => res.json("Blog Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json("Blog deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      blog.username = req.body.username;
      blog.title = req.body.title;
      blog.description = req.body.description;
      blog.date = Date.parse(req.body.date);

      blog
        .save()
        .then(() => res.json("Blog updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
