const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  todoTitle: {
    type: String,
    default: "",
  },
  todoContent: {
    type: String,
    default: "",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todos", todoSchema);
