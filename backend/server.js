const express = require("express");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

app.use(express.json());

app.use("/api/items", itemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
