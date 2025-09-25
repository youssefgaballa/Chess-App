
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
import { Server } from "socket.io";
import { createServer } from "http";
import { create } from "domain";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: [`http://localhost:${process.env.FRONTEND_PORT}`] }));
app.use(cookieParser());
// app.use((req, res, next) => {//
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
  const users = await client
    .query("SELECT * FROM users")
    .then((payload) => {
      return payload.rows;
    });
  console.log("users:", users);
  const notes = await client
    .query("SELECT * FROM notes")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  //console.log("notes:", notes);

  
})().catch((e) => { console.error(e); });

// const httpServer = app.listen(4000, () => {
//   console.log("HTTP Server running on port 4000");
// }); 
const httpServer = createServer(app);



const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("chat message received:", msg);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected:", socket.id);
  });
});
httpServer.listen(process.env.HTTP_PORT, () => {
  console.log(`HTTP Server running on http://localhost:${process.env.HTTP_PORT}`);
});


