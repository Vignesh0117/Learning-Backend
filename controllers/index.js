// controllers/index.js
const { validationResult } = require("express-validator");
const dataService = require("../utils/details");
const {
  itemValidationRules,
  idValidationRules,
} = require("../validators/itemValidator");

exports.getItems = async (req, res) => {
  try {
    const data = dataService.getItems();
    res.status(200).json({
      success: true,
      message: "Data fetched successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

exports.getItemById = [
  ...idValidationRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const item = dataService.getItemById(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Data fetched successfully!",
        data: item,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch item",
        error: error.message,
      });
    }
  },
];

exports.createItem = [
  ...itemValidationRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, category, price, inStock } = req.body;

      const items = dataService.getItems();
      const newItem = {
        id: items.length + 1,
        name,
        category,
        price,
        inStock,
      };

      dataService.createItem(newItem);

      res.status(201).json({
        success: true,
        message: "Data Added successfully!",
        data: newItem,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create item",
        error: error.message,
      });
    }
  },
];

exports.updateItem = [
  ...idValidationRules,
  ...itemValidationRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const { name, category, price, inStock } = req.body;

      const updatedItem = { name, category, price, inStock };
      dataService.updateItem(id, updatedItem);

      res.status(200).json({
        success: true,
        message: "Item updated successfully!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update item",
        error: error.message,
      });
    }
  },
];

exports.deleteItem = [
  ...idValidationRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      dataService.deleteItem(id);

      res.status(200).json({
        success: true,
        message: "Item deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete item",
        error: error.message,
      });
    }
  },
];
