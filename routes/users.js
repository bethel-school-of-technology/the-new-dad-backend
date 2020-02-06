const router = require("express").Router();
let User = require("../models/user.model");
let authService = require("../services/auth");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = authService.hashPassword(req.body.password);

  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  console.log(req.body);
  User.findOne({
    username: req.body.username
  }).then(user => {
    if (!user) {
      console.log("User not found");
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        let token = authService.signUser(user);
        let responseuser = {
          username: user.username
        };
        res.cookie("jwt", token);
        res.json(responseuser);
      } else {
        console.log("Wrong password");
        res.send("Wrong password");
      }
    }
  });
});

router.route("/logout").get((req, res, next) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.redirect("/users/login");
});

module.exports = router;
