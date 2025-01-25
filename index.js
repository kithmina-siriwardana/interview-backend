require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/User");
const authRoutes = require("./routes/Auth");
const menuRoutes = require("./routes/Menu");

const app = express();
const port = process.env.PORT || 3010;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: "GET,POST,PUT,PATCH,DELETE",
//     credentials: true,
//   })
// );

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
