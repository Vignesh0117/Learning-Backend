// validators/itemValidator.js
const { body, param } = require("express-validator");

// Validation rules for items
const itemValidationRules = [
  body("name").notEmpty().withMessage("Name field is required"),
  body("category").notEmpty().withMessage("Category field is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("inStock").isBoolean().withMessage("InStock must be a boolean"),
];

// Validation rules for item ID
const idValidationRules = [
  param("id").isNumeric().withMessage("ID must be a number"),
];

module.exports = { itemValidationRules, idValidationRules };
