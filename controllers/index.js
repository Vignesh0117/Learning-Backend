let items = [
  {
    id: 1,
    name: "Manoj",
  },
];

exports.getItems = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Data fetched successfully!",
    data: items,
  });
};

exports.getItemById = (req, res) => {
  const { id } = req.params;
  const item = items.find((i) => i.id === parseInt(id));

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
};

exports.createItem = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      errors: [{ field: "name", message: "Name field is required" }],
    });
  }

  const newItem = {
    id: items.length + 1,
    name,
  };
  items.push(newItem);

  res.status(201).json({
    success: true,
    message: "Data added successfully!",
  });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find((i) => i.id === parseInt(id));

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name field is required",
    });
  }

  item.name = name;

  res.status(200).json({
    success: true,
    message: "Name updated successfully!",
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex((i) => i.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  items.splice(itemIndex, 1);

  res.status(200).json({
    success: true,
    message: "Data deleted successfully!",
  });
};
