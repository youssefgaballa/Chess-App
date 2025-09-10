import pg, { type Client } from "pg";

const client: Client = new pg.Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
});

export default client;  