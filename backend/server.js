// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
