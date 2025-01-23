const { verifyToken } = require("../utils/auth");
const User = require("../models/User");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = {
    id: decoded.userId,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
  };

  next(); // If the token is valid, proceed to the next middleware/route handler
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Access denied. Admin privileges required" });
  }
  next();
};

module.exports = { authenticate, isAdmin };
