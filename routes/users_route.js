const express = require("express");
const usersController = require("../controllers/users_controller");
const { body } = require("express-validator");

const router = express.Router();

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  "/users",
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
  usersController.registerNewUser
);

module.exports = router;
