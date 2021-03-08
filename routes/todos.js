const express = require("express");
const router = express.Router();

// @route     GET api/todos
// @desc      Get all user todos
// @access    Private
router.get("/", (req, res) => {
  res.send("Get all user todos");
});

// @route     POST api/todos
// @desc      Add new todo
// @access    Private
router.post("/", (req, res) => {
  res.send("Add new todo");
});

// @route     PUT api/todos/:id
// @desc      Update todo
// @access    Private
router.put("/:id", (req, res) => {
  res.send("Update todo");
});

// @route     DELETE api/todos/:id
// @desc      Delete todo
// @access    Private
router.delete("/:id", (req, res) => {
  res.send("Delete todo");
});

module.exports = router;
