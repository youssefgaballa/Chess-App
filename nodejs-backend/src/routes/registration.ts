import express, { Router } from "express";
import client from "../database/index.ts";
import {hash} from 'bcrypt';

//TODO, put stuff in controller
const registrationRouter: Router = express.Router();

//Register new user
registrationRouter.post('/registration', async (req, res) => {
  const { username: newUsername, email: newEmail, password: newPassword, role: newRole } = req.body;
  //const { "username": newUsername } = req.body;
  if (!newUsername || !newPassword) {
    res.status(400).json({'Client Error': 'Username and password are required.'})
    return;
  }
  const duplicate = await client
    .query("SELECT (username) FROM users WHERE username = $1", [newUsername])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log(duplicate[0]);
  console.log(duplicate.length);
  if (duplicate[0]) {
    console.log("duplicate user in database");
    res.status(400).json({ 'Client Error': 'Username taken' });
    return;
  }
  const hashedPwd = await hash(newPassword, 10);
  // const hash1 = await hash('12432543234', 10);
  // const hash2 = await hash('1242353453234', 10);
  // console.log("hash1: " + hash1);
  // console.log("hash2: " + hash2);
   const result = await client.query("INSERT INTO users (username, email, pwd, user_role) VALUES ($1, $2, $3, $4) RETURNING *", [newUsername, newEmail, hashedPwd, newRole])
     .catch(() => {
       throw new Error("Query failed");
     });
   res.send(result.rows);

})

export default registrationRouter;