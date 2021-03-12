const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  todoTitle: {
    type: String,
    default: "No title",
  },
  todoContent: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todos", todoSchema);
