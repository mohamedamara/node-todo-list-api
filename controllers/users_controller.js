const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");
// load environment variables
require("dotenv").config();

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
  const jwt = generateJsonWebToken(newUser.id);
  response.status(201).json({ jwt });
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
