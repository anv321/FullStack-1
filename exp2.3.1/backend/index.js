import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

await connectDB();

// GET /api/products – all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// simple health check
app.get("/", (req, res) => {
  res.json({ message: "Products API up" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
