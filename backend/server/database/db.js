import pg from 'pg';
const { Pool } = pg;

// Create the pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Test connection
pool.query('SELECT NOW()', (err) => {
  if (err) console.error('Database connection error', err);
  else console.log('Connected to PostgreSQL');
});

// Export as 'db' to maintain your existing import syntax
export const db = {
  query: (text, params) => pool.query(text, params),
  get: async (text, params) => {
    const result = await pool.query(text, params);
    return result.rows[0] || null;
  },
  run: async (text, params) => {
    const result = await pool.query(text, params);
    return { lastID: result.rows[0]?.id }; // Simulate SQLite's lastID
  }
};