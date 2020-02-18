const jwt = require("jsonwebtoken");
const models = require("../models/user.model");
const bcrypt = require("bcryptjs");

var authService = {
  signUser: function(User, req, res, next) {
    const token = jwt.sign(
      {
        username: User.username
      },
      "secretkey",
      {
        expiresIn: "1h"
      }
    );
    console.log(token);
    return token;
  },

  verifyUser: function(token) {
    try {
      let decoded = jwt.verify(token, "secretkey");
      return models.users.findByName(decoded.User);
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
};

module.exports = authService;
