import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Auth + RBAC API" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
