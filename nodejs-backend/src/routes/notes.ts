import express, { Router } from "express";
import client from "../database/index.ts";
import jwt from 'jsonwebtoken';

//const { verify } = jwt;

const notesRouter: Router = express.Router();
//TODO put actual requests in controller
//TODO have not found messages
notesRouter.get("/data/:title", async (req, res) => {
  console.log("-----/data----");
  const title = req.params.title;
  const username = res.locals.username;
  const results = await client
    .query("SELECT content FROM notes WHERE title = $1 AND owner_id = (SELECT user_id FROM users WHERE username = $2)", [title, username])
    .then((payload) => {
      //console.log("payload.rows: ", payload.rows);
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.send(results[0].content);
});
// GET all notes for a user
notesRouter.get("/data", async (req, res) => {
  console.log("----/data all");

  //const accessToken = req.query.access_token?.toString();
  const accessToken = req.headers?.authorization?.split(' ')[1];
  const refreshToken = req.cookies?.refreshToken;
  //console.log("req.local.username: ", res.locals.username);
  // const username = req.headers?.username;
  // console.log("username from headers: ", username);
  const username = res.locals.username;
  // console.log("refresh token: ", refreshToken);
  // console.log("access token: ", accessToken);
  if (!accessToken) {
    return res.status(400).json({ 'Client Error': 'No valid access token provided' });
    // throw new Error("No access token provided");
  }
 
  const results = await client
    .query("SELECT * FROM notes, users where notes.owner_id = users.user_id AND users.username = $1", [username])
    .then((payload) => {
      console.log("payload.rows: ", payload.rows);
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.send(results);
});

notesRouter.get("/data/user/:username", async (req, res) => {
  const username = req.params.username;
  console.log("----/data/user/:username ", username);
  const results = await client
    .query("SELECT * FROM notes WHERE owner_id = (SELECT user_id FROM users WHERE username = $1)", [username])
    .then((payload) => {
      //console.log("payload.rows: ", payload.rows);
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log(results);
  res.send(results);
});

//PUBLISH new note
notesRouter.post("/data/:title", async (req, res) => {
  console.log("-----/data POST----");
  const { text: newText } = req.body;
  //console.log("text = " + newText);
  const title = req.params.title;
  const username = res.locals.username;
  // setTimeout(() => {
  //   res.send({ status: true });//
  // }, 2000);
  const owner_id = await client
    .query("SELECT user_id FROM users WHERE username = $1", [username])
    .then((payload) => {
      
      return payload.rows[0].user_id;
    });
  console.log("owner_id: ", owner_id);
  const result = await client.query("INSERT INTO notes (content, title, owner_id) VALUES ($1, $2, $3) RETURNING *", [newText, title, owner_id])
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log("result: ", result);
  res.send(result.rows[0]);

});

// UPDATE a note
notesRouter.patch("/data/:title", async (req, res) => {
  const { text: newText } = req.body;
  const title = req.params.title;
  const results = await client.query("UPDATE notes SET content = $1 WHERE title = $2 RETURNING *", [newText, title]);
  res.send({ status: true });
});

notesRouter.delete("/data/:title", async (req, res) => {
  //console.log(req.params.title);
  const title = req.params.title;
  const results = await client.query("DELETE FROM notes WHERE title = $1", [title]);
  res.send({ status: true });
});



export default notesRouter;