import express from "express";
import multer from "multer";
import { uploadProfile } from "../controllers/upload.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/profile_upload", authenticateToken, upload.single("profile"), uploadProfile);

export default router;






