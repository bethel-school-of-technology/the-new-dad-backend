const router = require("express").Router();
let User = require("../models/user.model");
let authService = require("../services/auth");
const withAuth = require("../middleware");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.get("/", function(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", function(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = authService.hashPassword(req.body.password);
  const newUser = new User({ username, email, password });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.post("/login", function(req, res) {
//   const { username } = req.body;
//   User.findOne({ username }, function(err, user) {
//     if (err) {
//       console.error(err);
//       res.status(500).json({
//         error: "Internal error please try again"
//       });
//     } else if (!user) {
//       res.status(401).json({
//         error: "Incorrect username or password"
//       });
//     } else {
//       let passwordMatch = authService.comparePasswords(
//         req.body.password,
//         user.password
//       );
//       if (passwordMatch) {
//         let token = authService.signUser(user);
//         console.log(token);
//         let responseuser = {
//           username: user.username
//         };
//         console.log(responseuser);
//         res.cookie("token", token);
//         res.send("Logged In!");
//       } else if (!same) {
//         res.status(401).json({
//           error: "Incorrect username or password"
//         });
//       }
//     }
//   });
// });

router.post("/login", function(req, res) {
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
        res.header({ Authorization: "Bearer " + token });
        res.json(responseuser);

      } else {
        console.log("Wrong password");
        res.send("Wrong password");
      }
    }
  });
});

router.get('/checkToken', function(req, res) {
  res.sendStatus(200);
});

router.get("/logout", function(req, res) {
  res.cookie("jwt", "", { expires: new Date(0) });
  console.log(res);
  res.send("Logged Out");
});

module.exports = router;