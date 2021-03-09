const bcrypt = require("bcrypt");
const userModel = require("../models/user_model");

exports.registerNewUser = async (req, res) => {
  try {
    await isUserAlreadyExists(req.body.email, res);
    req.body.password = await hashPassword(req.body.password);
    await saveUserToDatabase(req.body, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const isUserAlreadyExists = async (email, response) => {
  const user = await userModel.findOne({ email });
  if (user) return response.status(409).json({ msg: "User already exists" });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const saveUserToDatabase = async (requestData, response) => {
  const { firstName, lastName, email, password } = requestData;
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password,
  });
  await newUser.save();
  response.status(201).send("User saved to database");
};
