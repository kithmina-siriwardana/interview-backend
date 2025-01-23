const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/User");

const router = express.Router();

router.post("/", createUser());
router.get("/", getAllUsers());
router.get("/:id", getUserById());
router.get("/email/:email", getUserByEmail());
router.patch("/:id", updateUser());
router.delete("/:id", deleteUser());

module.exports = router;
