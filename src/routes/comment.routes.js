

// import express from "express";
// import { body } from "express-validator";
// import {
//   getCommentsByPost,
//   addComment,
//   deleteComment,
// } from "../controllers/comment.controller.js";
// import { authenticateToken } from "../middleware/auth.middleware.js";
// import { handleValidation } from "../middleware/validate.middleware.js";

// const router = express.Router();

// router.get("/posts/:id/comments", getCommentsByPost);

// router.post(
//   "/posts/:id/comments",
//   authenticateToken,
//   [body("content").notEmpty()],
//   handleValidation,
//   addComment
// );

// router.delete("/comments/:id", authenticateToken, deleteComment);

// export default router;



import express from "express";
import { body } from "express-validator";
import {
  getCommentsByPost,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { handleValidation } from "../middleware/validate.middleware.js";

const router = express.Router();

// ✅ Get all comments for a post
router.get("/posts/:id/comments", getCommentsByPost);

// ✅ Add a comment to a post
router.post(
  "/posts/:id/comments",
  authenticateToken,
  [body("content").notEmpty().withMessage("Content is required")],
  handleValidation,
  addComment
);

// ✅ Delete a comment (only owner can delete)
router.delete("/comments/:id", authenticateToken, deleteComment);

export default router;
