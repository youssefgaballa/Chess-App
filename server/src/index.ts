
import express from "express";
import cors from "cors";
import router from "./routes/index.ts";
import client from "./database/index.ts";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use("/", router);
//
(async () => {
  await client.connect();

  app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server is listening on port ${process.env.BACKEND_PORT}.`);
  });
  //console.log(client.connectionParameters);
  const results = await client
    .query("SELECT * FROM notes")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log(results);
  
})().catch((e) => { console.error(e); });

