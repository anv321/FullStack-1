import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";

async function seed() {
  await connectDB();
  await Product.deleteMany({});

  await Product.insertMany([
    {
      name: "iPhone 15 Pro",
      price: 999,
      category: "Smartphones",
      image: "https://via.placeholder.com/300x200?text=iPhone+15",
      description: "Latest Apple flagship with A17 chip."
    },
    {
      name: "Galaxy S24",
      price: 899,
      category: "Smartphones",
      image: "https://via.placeholder.com/300x200?text=Galaxy+S24",
      description: "Samsung flagship with AI features."
    },
    {
      name: "MacBook Air M3",
      price: 1299,
      category: "Laptops",
      image: "https://via.placeholder.com/300x200?text=MacBook+Air+M3",
      description: "Lightweight laptop with M3 chip."
    }
  ]);

  console.log("Seeded products");
  process.exit(0);
}

seed();
