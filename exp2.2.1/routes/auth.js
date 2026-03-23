// routes/auth.js
import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import asyncErrorHandler from '../middleware/asyncErrorHandler.js';

const router = express.Router();

router.post('/register', validateRegistration, asyncErrorHandler(register));
router.post('/login', validateLogin, asyncErrorHandler(login));

export default router;
