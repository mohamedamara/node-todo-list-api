const express = require("express");
const todosController = require("../controllers/todos_controller");

const router = express.Router();

// @route     GET api/todos
// @desc      Get all user todos
// @access    Private
router.get("/todos", todosController.getAllUserTodos);

// @route     POST api/todos
// @desc      Add new todo
// @access    Private
router.post("/todos", todosController.addNewTodo);

// @route     PUT api/todos/:id
// @desc      Update todo
// @access    Private
router.put("/todos/:id", todosController.updateTodo);

// @route     DELETE api/todos/:id
// @desc      Delete todo
// @access    Private
router.delete("/todos/:id", todosController.deleteTodo);

module.exports = router;