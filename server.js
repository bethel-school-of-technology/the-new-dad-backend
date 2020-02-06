const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var passport = require('passport');
var session = require('express-session');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(session({ secret: 'perilous journey' }));
app.use(passport.initialize());  
app.use(passport.session());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");
const repliesRouter = require("./routes/replies");

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);
app.use("/replies", repliesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
