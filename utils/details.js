// utils/dataService.js
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "data.json");
let items = [];

// Load data from the file once at startup
const loadData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    items = JSON.parse(data);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

// Write updated data to the file
const saveData = () => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Get all items
const getItems = () => {
  return items;
};

// Get item by ID
const getItemById = (id) => {
  return items?.find((i) => i?.id === parseInt(id));
};

// Create a new item
const createItem = (newItem) => {
  items.push(newItem);
  saveData();
};

// Update an item by ID
const updateItem = (id, updatedItem) => {
  const index = items?.findIndex((i) => i?.id === parseInt(id));
  if (index !== -1) {
    items[index] = { ...updatedItem, id: parseInt(id) };
    saveData();
  }
};

// Delete an item by ID
const deleteItem = (id) => {
  const index = items?.findIndex((i) => i?.id === parseInt(id));
  if (index !== -1) {
    items?.splice(index, 1);
    saveData();
  }
};

// Load data once when the module is loaded
loadData();

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
