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
  //console.log("/get all");
  try {
    const accessToken = req.query.access_token?.toString();
    console.log("req.query: ", req.query);
    console.log("access token: ", accessToken);
    if (!accessToken) throw new Error("No access token provided");
    
    verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`, (err: any, decoded: any) => {
      if (err) {
        throw new Error("Invalid access token");
      }
      console.log("decoded: ", decoded);
      return;
    });
  } catch {
    res.status(400).json({ 'Client Error': 'No valid access token provided' });
    return;
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