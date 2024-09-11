// app.js
const express = require("express");
const itemRoutes = require("./routes/index");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/items", itemRoutes);

module.exports = app;
