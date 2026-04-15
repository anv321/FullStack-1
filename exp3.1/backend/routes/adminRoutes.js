import express from "express";
import User from "../models/User.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

// GET /api/admin/users  (admin only)
router.get(
  "/users",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const users = await User.find().select("-password");
    res.json({ users });
  }
);

export default router;