const { body, validationResult } = require("express-validator");

exports.addNewTodoValidation = [
  body("todoTitle")
    .optional()
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
    .optional()
    .isString()
    .withMessage("Todo title most be a String"),
  body("todoContent")
    .optional()
    .isString()
    .withMessage("Todo content most be a String"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed most be a Boolean"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
