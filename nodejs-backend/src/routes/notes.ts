import express, { Router } from "express";
import client from "../database/index.ts";

const router: Router = express.Router();
//TODO put actual requests in controller

router.get("/data/:title", async (req, res) => {
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
router.get("/data", async (req, res) => {
  //console.log("/get all");  
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

router.post("/data/:title", async (req, res) => {
  const { text: newText } = req.body;
  //console.log("text = " + newText);
  const title = req.params.title;
  // setTimeout(() => {
  //   res.send({ status: true });//
  // }, 2000);
  const result = await client.query("INSERT INTO notes (content, title) VALUES ($1, $2) RETURNING *", [newText, title]);
  res.send(result.rows[0]);

});

router.patch("/data/:title", async (req, res) => {
  const { text: newText } = req.body;
  const title = req.params.title;
  const results = await client.query("UPDATE notes SET content = $1 WHERE title = $2 RETURNING *", [newText, title]);
  res.send({ status: true });
});

router.delete("/data/:title", async (req, res) => {
  //console.log(req.params.title);
  const title = req.params.title;
  const results = await client.query("DELETE FROM notes WHERE title = $1", [title]);
  res.send({ status: true });
});



export default router;