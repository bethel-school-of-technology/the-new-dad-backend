const router = require("express").Router();
let Reply = require("../models/reply.model");
router.route("/").get((req, res) => {
  Reply.find()
    .then(replies => res.json(replies))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const newReply = new Reply({
    username,
    description,
    date
  });
  newReply
    .save()
    .then(() => res.json("Reply Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
  Reply.findById(req.params.id)
    .then(reply => res.json(reply))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Reply.findByIdAndDelete(req.params.id)
    .then(() => res.json("Reply deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Reply.findById(req.params.id)
    .then(reply => {
      reply.username = req.body.username;
      reply.description = req.body.description;
      reply.date = Date.parse(req.body.date);
      reply
        .save()
        .then(() => res.json("Reply updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/updatereply/:id").post((req, res) => {
  Reply.findById(req.params.id)
    .then(reply => {
      reply.username = req.body.username;
      reply.description = req.body.description;
      reply.date = Date.parse(req.body.date);
      reply
        .save()
        .then(() => res.json("Reply updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
