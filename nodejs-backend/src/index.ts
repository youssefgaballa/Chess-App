
import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.ts";
import client from "./database/index.ts";
import usersRouter from "./routes/users.ts";
import registrationRouter from "./routes/registration.ts";
import authenticationRouter from "./routes/authentication.ts";
import refreshRouter from "./routes/refresh.ts";
import cookieParser from "cookie-parser";
import verifyAccessTokenRouter from "./routes/verifyAccessToken.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use(cookieParser());
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });
app.use('/', registrationRouter);
app.use('/', authenticationRouter);
app.use('/', refreshRouter);
app.use('/', verifyAccessTokenRouter)
app.use("/", usersRouter);
app.use("/", notesRouter);//

// app.use('/', require('cookie-parser')());




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

