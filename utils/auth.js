const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

// Sign JWT token
const generateToken = (userId, name, email, role) => {
  return jwt.sign({ userId, name, email, role }, secretKey, {
    expiresIn: "6h",
  });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
