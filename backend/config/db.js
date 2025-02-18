import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const { Pool } = pkg;

// Use environment variables for database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

export default pool;
