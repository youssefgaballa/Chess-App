import express from "express";
import cors from "cors";
import { type Express } from "express";
import router from "./routes/routes.ts";

const app: Express = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(router);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});