// middleware/validation.js
import { ValidationError } from '../utils/errors.js';

// Validation middleware for user registration
const validateRegistration = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return next(new ValidationError('Username must be at least 3 characters long'));
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return next(new ValidationError('Password must be at least 6 characters long'));
  }

  // Sanitize input
  req.body.username = username.trim().toLowerCase();

  // next() is called to pass control to the next middleware function in the stack, which will be the controller that handles the registration logic. If there are validation errors, they will be passed to the error handling middleware instead.
  next();
};

// Validation middleware for login
const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ValidationError('Username and password are required'));
  }

  // Sanitize input
  req.body.username = username.trim().toLowerCase();

  next();
};

export { validateRegistration, validateLogin };