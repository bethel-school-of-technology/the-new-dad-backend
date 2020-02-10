const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path =require('path')

require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

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

if(process.env.NODE_ENV ==='production') {
  app.use(express.static(''))
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
