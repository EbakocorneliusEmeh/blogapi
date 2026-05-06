import pool from './db.js';

export default {
  query: (text, params) => pool.query(text, params),
  pool
};
