import { Pool } from 'pg';

export const pool = new Pool({
  host: 'db',
  port: 6000,
  user: 'root',
  password: 'password',
  database: 'pg-db',
});