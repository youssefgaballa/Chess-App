import express from "express";
import cors from "cors";
import { type Express } from "express";
import router from "./routes/routes.ts";
import {pool} from "./db/db.ts";

async function main() {
  const client = await pool.connect();
}

main()
  .then(() => console.log('Connected to Postgres!'))
  .catch(err => console.error('Error connecting to Postgres!', err));

const app: Express = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(router);

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});