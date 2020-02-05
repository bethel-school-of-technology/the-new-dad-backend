const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const replySchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);
const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;