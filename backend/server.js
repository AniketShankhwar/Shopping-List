const express = require("express");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");

const app = express();
// Railway typically provides the port via an environment variable. 
// Using 3000 as a standard fallback.
const port = process.env.PORT || 3000; 

// 1. Define the exact URL of your Vercel frontend.
// We use the environment variable, but set the explicit URL as a safe fallback
// if the variable is missing (you MUST set this in Railway, see below).
const FRONTEND_URL = process.env.CORS_ORIGIN || 'https://shopping-list-sandy-tau.vercel.app';

// FIX CORS: Use the defined URL
app.use(
  cors({
    origin: FRONTEND_URL, // This must match your frontend URL exactly
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Assuming itemRoutes handles paths like '/' or '/:id' relative to /api/items
app.use("/api/items", itemRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});