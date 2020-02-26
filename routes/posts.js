const router = require("express").Router();
const withAuth = require('../middleware');
let Post = require("../models/post.model");
let authService = require("../services/auth");
const User = require('../models/user.model')

router.get("/", function (req, res) {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", function (req, res) {
  const title = req.body.title;
  const name = req.body.name;
  const date = Date.parse(req.body.date);
  const replies = req.body.replies;
  console.log(req.username);

  const newPost = new Post({
    title,
    name,
    date,
    replies
  });

  newPost
    .save()
    .then(() => res.json("Post Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/:id", function (req, res) {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/:id", function (req, res) {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json("Post deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/update/:id", function (req, res) {
  Post.findById(req.params.id)
    .then(post => {
      console.log(req.post)
      // User.findOne({
      //   username: req.username
      // }).then(post => {
      //   if (!post) {
      //     res.status(400).json('Error: Post not found!')
      //     return;
      //   }
      post.title = req.body.title;
      post.name = req.body.name;
      post.date = Date.parse(req.body.date);
      // let replies = post.replies;
      // replies.push({ reply: req.body.replies });
      // post.replies = replies;

      post
        .save()
        .then(() => res.json("Post updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    // })
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/reply/:id", function (req, res) {
  Post.findById(req.params.id)
    .then(post => {
      console.log(req.post)

      let replies = post.replies;
      replies.push({ reply: req.body.replies });
      post.replies = replies;

      post
        .save()
        .then(() => res.json("Post updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })

    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;