import pg from 'pg';
const { Pool } = pg;

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'projectdb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

// Create the pool
const pool = new Pool(dbConfig);

// Test connection
pool.query('SELECT NOW()', (err) => {
  if (err) console.error('Database connection error', err);
  else console.log('Connected to PostgreSQL');
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
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
  },
  pool // Export pool for advanced usage
};