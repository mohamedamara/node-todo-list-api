const bcrypt = require("bcrypt");
const userModel = require("../models/user_model");
const { validationResult } = require("express-validator");

exports.registerNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password } = req.body;
  try {
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists)
      return res.status(400).json({ msg: "User already exists" });
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.send("User saved");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
