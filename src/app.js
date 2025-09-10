import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import postsRoutes from './routes/post.routes.js';
import commentsRoutes from './routes/comment.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// rate limiter (basic)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120,
  message: { error: 'Too many requests, try again later.' }
});
app.use(limiter);

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

// search
import { searchController } from './controllers/post.controller.js';
app.get('/search', searchController);

// global error handler (must be last)
app.use(errorHandler);

export default app;
