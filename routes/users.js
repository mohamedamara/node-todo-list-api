const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  "/",
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "g"
    )
    .withMessage(
      "Password should contain at least 8 characters in length and a combination of 1 lower case letter, 1 upper case letter, 1 number or 1 special character"
    ),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    try {
      const isUserAlreadyExists = await UserModel.findOne({ email });
      if (isUserAlreadyExists)
        return res.status(400).json({ msg: "User already exists" });
      const newUser = new UserModel({
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
  }
);

module.exports = router;
