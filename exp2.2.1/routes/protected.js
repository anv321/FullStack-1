// routes/protected.js
import express from 'express';
import { getDashboard } from '../controllers/protectedController.js';
import authMiddleware from '../middleware/auth.js';
import asyncErrorHandler from '../middleware/asyncErrorHandler.js';

const router = express.Router();

// Protected route
router.get('/dashboard', authMiddleware, asyncErrorHandler(getDashboard));

export default router;