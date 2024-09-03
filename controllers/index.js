// Sample data
let items = [
  {
    id: 1,
    name: "Apple iPhone 13",
    category: "Electronics",
    price: 999,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    category: "Electronics",
    price: 799,
    inStock: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    category: "Headphones",
    price: 349,
    inStock: false,
  },
];

exports.getItems = async (req, res) => {
  try {
    const data = await Promise.resolve(items);

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

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Promise.resolve(
      items?.find((i) => i?.id === parseInt(id))
    );

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
};

exports.createItem = async (req, res) => {
  try {
    const { name, category, price, inStock } = req.body;

    if (
      !name ||
      !category ||
      typeof price === "undefined" ||
      typeof inStock === "undefined"
    ) {
      return res.status(400).json({
        success: false,
        errors: [
          { field: "name", message: "Name field is required" },
          { field: "category", message: "Category field is required" },
          { field: "price", message: "Price field is required" },
          { field: "inStock", message: "InStock field is required" },
        ],
      });
    }

    const newItem = {
      id: items?.length + 1,
      name,
      category,
      price,
      inStock,
    };

    items.push(newItem);

    res.status(201).json({
      success: true,
      message: "Data added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create item",
      error: error.message,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, inStock } = req.body;
    const item = await Promise.resolve(
      items?.find((i) => i?.id === parseInt(id))
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (
      !name ||
      !category ||
      typeof price === "undefined" ||
      typeof inStock === "undefined"
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, category, price, inStock) are required",
      });
    }

    item.name = name;
    item.category = category;
    item.price = price;
    item.inStock = inStock;

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
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const itemIndex = await Promise.resolve(
      items.findIndex((i) => i.id === parseInt(id))
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    items.splice(itemIndex, 1);

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
};
