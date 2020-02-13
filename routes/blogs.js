const router = require("express").Router();
let Blog = require("../models/blog.model");

router.get("/", function(req, res) {
  Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", function(req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newBlog = new Blog({
    title,
    description,
    date
  });

  newBlog
    .save()
    .then(() => res.json("Blog Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/:id", function(req, res) {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/:id", function(req, res) {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json("Blog deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/update/:id", function(req, res) {
  Blog.findById(req.params.id)
    .then(blog => {
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
