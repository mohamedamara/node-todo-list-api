const express = require("express");
const todosController = require("../controllers/todos_controller");
const {
  addNewTodoValidation,
  updateTodoValidation,
} = require("../middlewares/validators/todos_route_validation");
const authVerification = require("../middlewares/auth");

const router = express.Router();

// @route     GET api/todos
// @desc      Get all user todos
// @access    Private
router.get("/todos", authVerification, todosController.getAllUserTodos);

// @route     GET api/trash
// @desc      Get all user todos in trash
// @access    Private
router.get(
  "/todos/:showTrash",
  authVerification,
  todosController.getAllUserTodos
);

// @route     POST api/todos
// @desc      Add new todo
// @access    Private
router.post(
  "/todos",
  authVerification,
  addNewTodoValidation,
  todosController.addNewTodo
);

// @route     PUT api/todos/:id
// @desc      Update todo
// @access    Private
router.put(
  "/todos/:id",
  authVerification,
  updateTodoValidation,
  todosController.updateTodo
);

// @route     DELETE api/todos/:id
// @desc      Delete todo
// @access    Private
router.delete(
  "/todos/:id/:moveToTrash",
  authVerification,
  todosController.deleteTodo
);

module.exports = router;
