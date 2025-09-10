

import pool from "../db/db.js";

// Get comments for a post
export const getCommentsByPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT c.id, c.content, c.created_at, u.username 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.post_id = $1
       ORDER BY c.created_at DESC`,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

//  Add a comment
export const addComment = async (req, res, next) => {
  try {
    const { id } = req.params; // post_id
    const { content } = req.body;
    const userId = req.user.id;

    // Check if post exists
    const post = await pool.query("SELECT id FROM posts WHERE id = $1", [id]);
    if (post.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Insert comment
    const result = await pool.query(
      `INSERT INTO comments (content, user_id, post_id) 
       VALUES ($1, $2, $3) 
       RETURNING id, content, user_id, post_id, created_at`,
      [content, userId, id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

//  Delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the comment
    const comment = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);
    if (comment.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Only owner can delete
    if (comment.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Delete
    await pool.query("DELETE FROM comments WHERE id = $1", [id]);

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
