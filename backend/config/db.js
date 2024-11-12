const { Pool } = require('pg');
const dotenv = require('dotenv');
const { host, password, port, database, user, idleTimeoutMillis } = require('pg/lib/defaults');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutError: 2000
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = pool;
