const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/auth");

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/User");

const router = express.Router();

router.use(authenticate);

router.post("/", createUser());
router.get("/", getAllUsers());
router.get("/:id", getUserById());
router.get("/email/:email", getUserByEmail());
router.patch("/:id", updateUser());
router.delete("/:id", isAdmin, deleteUser());

module.exports = router;
