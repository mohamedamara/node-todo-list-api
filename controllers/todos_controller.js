const todoModel = require("../models/todo_model");

exports.getAllUserTodos = async (req, res) => {
  try {
		const contacts = await todoModel.find({ owner: req.userId }).sort({
			date: "descending"
		});
		res.json(contacts);
	} catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.addNewTodo = (req, res) => {
  res.send("Add new todo");
};
exports.updateTodo = (req, res) => {
  res.send("Update todo");
};
exports.deleteTodo = (req, res) => {
  res.send("Delete todo");
};
