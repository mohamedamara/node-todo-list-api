const { body, validationResult } = require("express-validator");

exports.addNewTodoValidation = [
  body("todoTitle")
    .notEmpty()
    .withMessage("Todo title is required")
    .isString()
    .withMessage("Todo title most be a String"),
  body("todoContent")
    .optional()
    .isString()
    .withMessage("Todo content most be a String"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.updateTodoValidation = [
  body("todoTitle")
    .notEmpty()
    .withMessage("Todo title is required")
    .isString()
    .withMessage("Todo title most be a String"),
  body("todoContent")
    .optional()
    .isString()
    .withMessage("Todo content most be a String"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
