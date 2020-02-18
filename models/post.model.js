const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    // username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    replies: [
      {
        uid: String,
        username: String,
        reply: String
      }
    ]
  },
  {
    timestamps: true
  }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
