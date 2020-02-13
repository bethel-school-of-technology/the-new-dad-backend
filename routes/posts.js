const router = require("express").Router();
const withAuth = require("../middleware");
let Post = require("../models/post.model");
let authService = require("../services/auth");
const User = require("../models/user.model");

router.get("/", function(req, res) {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", function(req, res) {
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const replies = req.body.replies;

  const newPost = new Post({
    username,
    title,
    description,
    date,
    replies
  });

  newPost
    .save()
    .then(() => res.json("Post Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/:id", function(req, res) {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/:id", function(req, res) {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json("Post deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/update/:id", withAuth, function(req, res) {
  Post.findById(req.params.id)
    .then(post => {
      console.log(req.username);
      User.findOne({
        username: req.username
      }).then(user => {
        if (!user) {
          res.status(400).json("Error: User not found!");
          return;
        }
        post.username = req.body.username;
        post.title = req.body.title;
        post.description = req.body.description;
        post.date = Date.parse(req.body.date);
        let replies = post.replies;
        replies.push({
          uid: user.id,
          username: user.username,
          reply: req.body.replies
        });
        post.replies = replies;

        post
          .save()
          .then(() => res.json("Post updated!"))
          .catch(err => res.status(400).json("Error: " + err));
      });
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/reply", withAuth, function(req, res) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.send("Invalid authentication token");
      }
    });
  } else {
    res.status(401);
    res.send("Must be logged in");
  }
});

module.exports = router;
