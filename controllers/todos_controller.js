const todoModel = require("../models/todo_model");

exports.getAllUserTodos = async (req, res) => {
  try {
    const contacts = await todoModel.find({ owner: req.userId }).sort({
      date: "descending",
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.addNewTodo = async (req, res) => {
  try {
    await saveTodo(req, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const saveTodo = async (req, res) => {
  const { todoTitle, todoContent } = req.body;
  const newTodo = new todoModel({
    todoTitle,
    todoContent,
    owner: req.userId,
  });
  const todo = await newTodo.save();
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  res.send("Update todo");
};
exports.deleteTodo = async (req, res) => {
  res.send("Delete todo");
};
