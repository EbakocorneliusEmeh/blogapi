

import express from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/auth.controller.js';
import { handleValidation } from '../middleware/validate.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  handleValidation,
  register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').exists().withMessage('Password is required')
  ],
  handleValidation,
  login
);

// Get current user
router.get('/me', authenticateToken, me);

export default router;
