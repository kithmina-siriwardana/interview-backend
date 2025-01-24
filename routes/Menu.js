const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/auth");

const {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  getMenuItemByItemNo,
  getMenuItemsByCategory,
  getMenuItemsByType,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/Menu");

const router = express.Router();

// router.use(authenticate);

router.post("/", authenticate, isAdmin, createMenuItem());
router.get("/", getAllMenuItems());
router.get("/:id", getMenuItemById());
router.get("/itemNo/:itemNo", getMenuItemByItemNo());
router.get("/category/:category", getMenuItemsByCategory());
router.get("/type/:type", getMenuItemsByType());
router.patch("/:id", authenticate, isAdmin, updateMenuItem());
router.delete("/:id", authenticate, isAdmin, deleteMenuItem());

module.exports = router;
