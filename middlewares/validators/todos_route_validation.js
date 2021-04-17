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
  body("todoColor")
    .optional()
    .isHexColor()
    .withMessage("Todo Color most be a valid Hex Color")
    .custom(
      (value) =>
        value === "#fff" ||
        value === "#f28b82" ||
        value === "#fff475" ||
        value === "#ccff90" ||
        value === "#a7ffeb" ||
        value === "#d7aefb"
    ),
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
  body("todoColor")
    .optional()
    .isHexColor()
    .withMessage("Todo Color most be a valid Hex Color")
    .custom(
      (value) =>
        value === "#fff" ||
        value === "#f28b82" ||
        value === "#fff475" ||
        value === "#ccff90" ||
        value === "#a7ffeb" ||
        value === "#d7aefb"
    ),
  body("keepInTrash")
    .optional()
    .isBoolean()
    .withMessage("keepInTrash value most be a String"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
