

// import express from "express";
// import { body } from "express-validator";
// import {
//   getPosts,
//   getPostById,
//   createPost,
//   updatePost,
//   deletePost,
// } from "../controllers/post.controller.js";
// import { authenticateToken } from "../middleware/auth.middleware.js";
// import { handleValidation } from "../middleware/validate.middleware.js";

// const router = express.Router();

// router.get("/", getPosts);
// router.get("/:id", getPostById);

// router.post(
//   "/",
//   authenticateToken,
//   [body("title").notEmpty(), body("content").notEmpty()],
//   handleValidation,
//   createPost
// );

// router.put("/:id", authenticateToken, updatePost);
// router.delete("/:id", authenticateToken, deletePost);

// export default router;




import express from "express";
import { body } from "express-validator";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { handleValidation } from "../middleware/validate.middleware.js";

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Get single post by ID (with comments)
router.get("/:id", getPostById);

// Create post
router.post(
  "/",
  authenticateToken,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  handleValidation,
  createPost
);

// Update post (partial update allowed)
router.put(
  "/:id",
  authenticateToken,
  [
    body("title").optional().isString(),
    body("content").optional().isString(),
  ],
  handleValidation,
  updatePost
);

// Delete post
router.delete("/:id", authenticateToken, deletePost);

export default router;
