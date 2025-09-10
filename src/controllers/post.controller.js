

import pool from "../db/db.js";

// Get all posts with pagination
export const getPosts = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Get single post with its comments
export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (post.rows.length === 0)
      return res.status(404).json({ error: "Post not found" });

    const comments = await pool.query(
      `SELECT c.id, c.content, c.created_at, u.username 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.post_id = $1
       ORDER BY c.created_at DESC`,
      [id]
    );

    res.json({ ...post.rows[0], comments: comments.rows });
  } catch (err) {
    next(err);
  }
};

// Create a new post
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; 

    const result = await pool.query(
      "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Update a post (partial update allowed)
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    // Check ownership
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (post.rows.length === 0)
      return res.status(404).json({ error: "Post not found" });
    if (post.rows[0].user_id !== userId)
      return res.status(403).json({ error: "Not authorized" });

    const result = await pool.query(
      `UPDATE posts
       SET title = COALESCE($1, title),
           content = COALESCE($2, content)
       WHERE id = $3
       RETURNING *`,
      [title || null, content || null, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Delete a post
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (post.rows.length === 0)
      return res.status(404).json({ error: "Post not found" });
    if (post.rows[0].user_id !== userId)
      return res.status(403).json({ error: "Not authorized" });

    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
