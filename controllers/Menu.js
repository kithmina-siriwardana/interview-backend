const Menu = require("../models/Menu");

// Generate Menu Item Number
const generateItemNo = async () => {
  try {
    // Find the last created item by sorting in descending order of `itemNo`
    const lastItem = await Menu.findOne().sort({ itemNo: -1 });

    let nextItemNo;
    if (lastItem) {
      // Extract the numeric part of the `itemNo` and increment it
      const lastItemNo = parseInt(lastItem.itemNo, 10);
      nextItemNo = String(lastItemNo + 1).padStart(4, "0");
    } else {
      // If no items exist, start with '0001'
      nextItemNo = "0001";
    }

    return nextItemNo;
  } catch (error) {
    console.error("Error generating item number:", error);
    throw error;
  }
};

// Create a new menu item
const createMenuItem = () => async (req, res) => {
  try {
    const { name, description, price, image, category, type } = req.body;

    // Check if the req body contains all the required fields
    if (!name || !description || !price || !category || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate the item number
    const itemNo = await generateItemNo();

    const newMenuItem = new Menu({
      itemNo,
      name,
      description,
      price,
      image,
      category,
      type,
    });
    const savedMenuItem = await newMenuItem.save();

    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all menu items
const getAllMenuItems = () => async (_req, res) => {
  try {
    const menuItems = await Menu.find().sort({ isActive: -1, createdAt: -1 });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all active menu items
const getAllActiveMenuItems = () => async (_req, res) => {
  try {
    const menuItems = await Menu.find({ isActive: true });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a menu item by id
const getMenuItemById = () => async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get menu item by item number
const getMenuItemByItemNo = () => async (req, res) => {
  try {
    const { itemNo } = req.params;
    const menuItem = await Menu.findOne({ itemNo });

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get menu items by category
const getMenuItemsByCategory = () => async (req, res) => {
  try {
    const { category } = req.params;
    const menuItems = await Menu.find({ category });
    return res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get menu items by type
const getMenuItemsByType = () => async (req, res) => {
  try {
    const { type } = req.params;
    const menuItems = await Menu.find({ type });
    return res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a menu item by id
const updateMenuItem = () => async (req, res) => {
  try {
    const { name, description, price, image, category, type, isActive } =
      req.body;

    const updatedMenuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category, type, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a menu item by id soft delete
const deleteMenuItem = () => async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenuItem = await Menu.findByIdAndUpdate(
      { _id: id },
      { isActive: false },
      { new: true }
    );

    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(deletedMenuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get latest 3 menu items
const getLatestMenuItems = () => async (_req, res) => {
  try {
    const menuItems = await Menu.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get number of menu items
const getMenuItemCount = () => async (_req, res) => {
  try {
    const menuItemCount = await Menu.countDocuments({ isActive: true });
    res.status(200).json(menuItemCount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMenuItem,
  getAllMenuItems,
  getAllActiveMenuItems,
  getMenuItemById,
  getMenuItemByItemNo,
  getMenuItemsByCategory,
  getMenuItemsByType,
  getLatestMenuItems,
  getMenuItemCount,
  updateMenuItem,
  deleteMenuItem,
};
