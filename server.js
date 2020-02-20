const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(session({ secret: 'perilous journey' }));
app.use(passport.initialize());  
app.use(passport.session());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");


app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
