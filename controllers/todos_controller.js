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
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.deleteTodo = async (req, res) => {
  res.send("Delete todo");
};
