// Express
const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());

// Data store in memory
let items = [
  {
    id: 1,
    name: "Manoj",
  },
];

// GET API
app.get("/items", (req, res) => {
  res?.send({
    success: true,
    message: "Data Fetched Successfully!",
    data: items,
  });
});

// GET by ID
app.get("/items/:id", (req, res) => {
  const { id } = req?.params;
  const item = items?.find((i) => i?.id === parseInt(id));
  if (!item) {
    res?.status(402).send({
      success: false,
      message: "Item Not Found",
    });
  } else {
    res?.status(200).send({
      success: true,
      message: "Data Fetch Successfully!",
      data: item,
    });
  }
});

// POST API
app.post("/items", (req, res) => {
  const { name } = req?.body;

  // Validate that the name field is present
  if (!name) {
    res?.status(400)?.send({
      success: false,
      errors: [
        {
          field: "name",
          message: "Name field is required",
        },
      ],
    });
  }

  // Create new item only if validation passes
  const newItem = {
    id: items?.length + 1,
    name,
  };
  items?.push(newItem);

  res?.status(201)?.send({
    success: true,
    message: "Data Added Successfully!",
  });
});

// PUT API
app.put("/items/:id", (req, res) => {
  const { id } = req?.params;
  const { name } = req?.body;
  const item = items?.find((i) => i?.id === parseInt(id));

  if (!item) {
    res?.status(404)?.send({
      success: false,
      message: "Item Not Found",
    });
  }

  if (!name) {
    res?.status(400)?.send({
      success: false,
      message: "Name Missing",
    });
  }

  item.name = name;

  res?.status(201).send({
    success: true,
    message: "Name Updated Successfully!",
  });
});

// DELETE API
app.delete("/items/:id", (req, res) => {
  const { id } = req?.params;
  const itemIndex = items?.findIndex((i) => i?.id === parseInt(id));

  if (itemIndex === -1) {
    res?.status(404)?.send({
      success: false,
      message: "Item Not Found",
    });
  }

  items?.splice(itemIndex, 1);

  res?.status(200)?.send({
    success: true,
    message: "Data Deleted Successfully!"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
