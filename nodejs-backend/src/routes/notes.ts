import express, { Router } from "express";
import client from "../database/index.ts";
import jwt from 'jsonwebtoken';

const { verify } = jwt;

const notesRouter: Router = express.Router();
//TODO put actual requests in controller
//TODO have not found messages
notesRouter.get("/data/:title", async (req, res) => {
  //console.log("/get");
  const title = req.params.title;
  const results = await client
    .query("SELECT content FROM notes WHERE title = $1", [title])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.send(results[0].content);
});
// GET all notes for a user
notesRouter.get("/data", async (req, res) => {
  console.log("----/get all");

  //const accessToken = req.query.access_token?.toString();
  const accessToken = req.headers?.authorization?.split(' ')[1];
  const refreshToken = req.cookies?.jwt;
  // const username = req.headers?.username;
  // console.log("username from headers: ", username);
  //console.log("username from body: ", req.body.username);
  console.log("res.locals.username: ", res.locals.username);
  console.log("refresh token: ", refreshToken);
  console.log("access token: ", accessToken);
  if (!accessToken) {
    return res.status(400).json({ 'Client Error': 'No valid access token provided' });
    // throw new Error("No access token provided");
  }
 
  const results = await client
    .query("SELECT * FROM notes")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.send(results);
});

notesRouter.post("/data/:title", async (req, res) => {
  const { text: newText } = req.body;
  //console.log("text = " + newText);
  const title = req.params.title;
  // setTimeout(() => {
  //   res.send({ status: true });//
  // }, 2000);
  const result = await client.query("INSERT INTO notes (content, title) VALUES ($1, $2) RETURNING *", [newText, title]);
  res.send(result.rows[0]);

});

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