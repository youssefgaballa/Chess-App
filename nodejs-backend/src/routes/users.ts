import express, { Router } from "express";
import client from "../database/index.ts";

const usersRouter: Router = express.Router();
//TODO; put actual requests in controller
//TODO: have not found messages
//TODO: remove endpoints that shouldnt be called by frontend

usersRouter.get('/users/:username', async (req, res) => {
  //console.log("get single user");
  const username = req.params.username;
  const results = await client
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.send(results[0]);
});

//Get all users
usersRouter.get('/users', async (req, res) => {
  const results = await client.query("SELECT * from users")
    .then((payload) => {
      return payload.rows;
    }).catch(() => {
      throw new Error("Query failed");
    });
  res.send(results);
});



// usersRouter.post('/users', async (req, res) => {

//   const { username: newUsername, email: newEmail, role: newRole } = req.body;
//   //const { "username": newUsername } = req.body;
//   const result = await client.query("INSERT INTO users (username, email, user_role) VALUES ($1, $2, $3) RETURNING *", [newUsername, newEmail, newRole])
//     .catch(() => {
//       throw new Error("Query failed");
//     });
//   res.send(result);
//   //res.send({ status: true });

// });

// update email
usersRouter.patch("/users/:username", async (req, res) => {
  const { email: newEmail } = req.body;
  const username = req.params.username;
  const results = await client.query("UPDATE users SET email = $1 WHERE username = $2 RETURNING *", [newEmail, username]);
  res.send(results.rows[0]);
});

usersRouter.delete('/users/:username', async (req, res) => {
  const username = req.params.username;
  const result = await client
    .query("DELETE FROM users WHERE username = $1", [username])
    .catch(() => {
      throw new Error("Query failed");
    });
  res.send(result);
});


export default usersRouter;