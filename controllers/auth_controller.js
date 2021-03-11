const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/user_model");

exports.loginUser = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    await verifyEmail(user, res);
    console.log("sdfasdfsdfaad");
    await verifyPassword(req.body.password, user.password, res);
    const jwt = generateJsonWebToken(user.id);
    res.status(200).json({ jwt });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const verifyEmail = (user, res) => {
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};

const verifyPassword = async (requestPassword, hashedPassword, res) => {
  const isPasswordMatch = await bcrypt.compare(requestPassword, hashedPassword);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};

const generateJsonWebToken = (userId) => {
  const generatedToken = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return generatedToken;
};

exports.getLoggedUser = async (req, res) => {
  try {
    const user = await getUserById(req.userId);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (userId) => {
  return await userModel.findById(userId).select("-password");
};
