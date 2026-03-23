import express from 'express';
import mongoose from 'mongoose';
import loggingMiddleware from './middleware/logging.js';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import { ValidationError, AuthenticationError, NotFoundError, ConflictError } from './utils/errors.js';
import User from './models/User.js';
import { connectDB } from "./config/db.js";
const app = express();
const PORT = process.env.PORT || 3000;

User.init();

// Middleware
app.use(express.json()); 

app.use(loggingMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

// Public route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Error handling middleware (placed last)
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Handle custom errors
  if (err instanceof ValidationError ||
    err instanceof AuthenticationError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Default error
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
