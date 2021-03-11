const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");
require("dotenv").config();

exports.registerNewUser = async (req, res) => {
  try {
    await isUserAlreadyExists(req.body.email, res);
    req.body.password = await hashPassword(req.body.password);
    await saveUserToDatabase(req.body, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const isUserAlreadyExists = async (email, res) => {
  const user = await userModel.findOne({ email });
  if (user) return res.status(409).json({ message: "User already exists" });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const saveUserToDatabase = async (requestData, res) => {
  const { firstName, lastName, email, password } = requestData;
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password,
  });
  await newUser.save();
  const jwt = generateJsonWebToken(newUser.id);
  res.status(201).json({ jwt });
};

const generateJsonWebToken = (userID) => {
  const generatedToken = jwt.sign(
    {
      userID: userID,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return generatedToken;
};
