const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    replies: Array
  },
  {
    timestamps: true
  }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
