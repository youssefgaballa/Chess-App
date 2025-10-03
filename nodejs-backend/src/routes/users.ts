import express, { Router } from "express";
import client from "../database/database.ts";
import { hash } from "bcrypt";

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
  const { username: newUsername, email: newEmail, firstName: newFirstName, lastName: newLastName,
    password: newPassword, role: newRole
  } = req.body;
  const hashedPwd = await hash(newPassword, 10);
  // console.log("req.body: ", req.body);
   console.log("newUsername: ", newUsername);
  // console.log("newEmail: ", newEmail);
  // console.log("newFirstName: ", newFirstName);
  // console.log("newLastName: ", newLastName);
  // console.log("newPassword: ", newPassword);
  // console.log("newRole: ", newRole);
  const username = req.params.username;
  console.log("username from params: ", username);
  const results = await client.query("UPDATE users SET username = $1, email = $2, firstName = $3, lastName = $4, pwd = $5, user_role = $6 WHERE username = $7 RETURNING *",
    [newUsername, newEmail, newFirstName, newLastName, hashedPwd, newRole, username]).catch(() => {
      throw new Error("Query failed");
    });
  console.log("results/rows[0]: ", results.rows[0]);
  res.send(results.rows[0]);
});

usersRouter.delete('/users/:username', async (req, res) => {
  const username = req.params.username;
  const result = await client
    .query("DELETE FROM users WHERE username = $1", [username])
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log("result: ", result);
  res.send(result);
});


export default usersRouter;