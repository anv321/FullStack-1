import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

async function seed() {
  await connectDB();
  await User.deleteMany({});

  const password = await bcrypt.hash("password123", 10);

  await User.insertMany([
    {
      name: "Regular User",
      email: "user@example.com",
      password,
      role: "user"
    },
    {
      name: "Admin User",
      email: "admin@example.com",
      password,
      role: "admin"
    }
  ]);

  console.log("Seeded users");
  process.exit(0);
}

seed();