require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const authRoutes = require("./routes/Auth");

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());

console.log(process.env.MONGODB_URI);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
