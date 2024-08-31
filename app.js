const express = require("express");
const itemRoutes = require("./routes/index");
const errorHandler = require("./middleware/index");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/items", itemRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;
