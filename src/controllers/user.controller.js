import db from '../db/index.js';

// Get user by ID
export async function getUser(req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    const { rows } = await db.query(
      'SELECT id, username, email, profile_url, created_at FROM users WHERE id=$1',
      [userId]
    );
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });
    res.json({ user: rows[0] });
  } catch (err) { next(err); }
}

// Update user profile (username, email, profile picture)
export async function updateUser(req, res, next) {
  try {
    const userId = req.user.id;
    const { username, email, profile_url } = req.body;
    const { rows } = await db.query(
      `UPDATE users 
       SET username=COALESCE($1, username), 
           email=COALESCE($2, email),
           profile_url=COALESCE($3, profile_url)
       WHERE id=$4 RETURNING id, username, email, profile_url, created_at`,
      [username, email, profile_url, userId]
    );
    res.json({ user: rows[0] });
  } catch (err) { next(err); }
}
