const express = require("express");
const todosController = require("../controllers/todos_controller");
const authVerification = require("../middlewares/auth");

const router = express.Router();

// @route     GET api/todos
// @desc      Get all user todos
// @access    Private
router.get("/todos", authVerification, todosController.getAllUserTodos);

// @route     POST api/todos
// @desc      Add new todo
// @access    Private
router.post("/todos", authVerification, todosController.addNewTodo);

// @route     PUT api/todos/:id
// @desc      Update todo
// @access    Private
router.put("/todos/:id", authVerification, todosController.updateTodo);

// @route     DELETE api/todos/:id
// @desc      Delete todo
// @access    Private
router.delete("/todos/:id", authVerification, todosController.deleteTodo);

module.exports = router;
