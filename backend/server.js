const express = require("express");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = process.env.PORT || 8080;

// FIX CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/items", itemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
