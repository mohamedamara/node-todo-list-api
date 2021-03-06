const mongoose = require("mongoose");
const todoModel = require("../models/todo_model");
const io = require("../config/socket_io_connection");

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
  const { todoTitle, todoContent, todoColor } = req.body;
  const newTodo = new todoModel({
    todoTitle,
    todoContent,
    todoColor,
    owner: req.userId,
  });
  const todo = await newTodo.save();
  io.getIO().emit("notes");
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(todoId))
      return res.status(404).json({ message: "Todo not found" });
    const todo = await todoModel.findById(todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.owner.toString() !== req.userId)
      return res.status(401).json({ message: "Unauthorized user" });
    await saveUpdatedTodo(req, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const saveUpdatedTodo = async (req, res) => {
  const updateTodoFields = buildUpdateTodoFields(req);
  const updatedtodo = await todoModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateTodoFields },
    { new: true }
  );
  io.getIO().emit("notes");
  res.status(200).json(updatedtodo);
};

const buildUpdateTodoFields = (req) => {
  const { todoTitle, todoContent, todoColor, keepInTrash } = req.body;
  const updateTodoFields = {};
  if (todoTitle !== undefined) updateTodoFields.todoTitle = todoTitle;
  if (todoContent !== undefined) updateTodoFields.todoContent = todoContent;
  if (todoColor !== undefined) updateTodoFields.todoColor = todoColor;
  if (keepInTrash !== undefined) updateTodoFields.keepInTrash = keepInTrash;
  return updateTodoFields;
};

exports.deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(todoId))
      return res.status(404).json({ message: "Todo not found" });
    const todo = await todoModel.findById(todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.owner.toString() !== req.userId)
      return res.status(401).json({ message: "Unauthorized user" });
    await todoModel.findByIdAndRemove(todoId);
    io.getIO().emit("notes");
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
