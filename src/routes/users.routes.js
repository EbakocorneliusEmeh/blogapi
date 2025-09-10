import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.middleware.js';
import db from '../db/index.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const uploadDir = process.env.UPLOAD_DIR || './uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `profile_${req.user.id}_${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage });

router.post('/profile_upload', authenticateToken, upload.single('profile'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `${req.file.path}`;
    const { rows } = await db.query('UPDATE users SET profile_url=$1 WHERE id=$2 RETURNING id, username, profile_url', [url, req.user.id]);
    res.json({ user: rows[0] });
  } catch (err) {
    next(err);
  }
});

export default router;
