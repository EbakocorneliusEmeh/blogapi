import pool from './db/db.js';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB Connected:', res.rows[0]);
  } catch (err) {
    console.error('DB Connection Error:', err);
  } finally {
    await pool.end();
  }
})();
