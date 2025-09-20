import express, { Router } from "express";
import client from "../database/index.ts";
import {hash} from 'bcrypt';

//TODO, put stuff in controller
const registrationRouter: Router = express.Router();

//Register new user
registrationRouter.post('/registration', async (req, res) => {
  console.log("----/registration");
  const { username: newUsername, email: newEmail, firstName: newFirstName,
    lastName: newLastName, password: newPassword, role: newRole } = req.body;
  // console.log("username: ", newUsername);
  // console.log("email: ", newEmail);
  // console.log("firstName: ", newFirstName);
  // console.log("lastName: ", newLastName);
  // console.log("password: ", newPassword);
  // console.log("role: ", newRole);
  if (!newUsername || !newPassword) {
    res.status(400).json({'Client Error': 'Username and password are required.'})
    return;
  }
  const duplicateUsername = await client
    .query("SELECT (username) FROM users WHERE username = $1", [newUsername])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log(duplicateUsername[0]);
  if (duplicateUsername[0]) {
    console.log("duplicate user in database");
    res.status(400).json({ 'Client Error': 'Username taken' });
    return;
  }
  const duplicateEmail = await client
    .query("SELECT (email) FROM users WHERE email = $1", [newEmail])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log(duplicateEmail[0]);
  if (duplicateEmail[0]) {
    console.log("duplicate email in database");
    res.status(400).json({ 'Client Error': 'Email taken' });
    return;
  }
  const hashedPwd = await hash(newPassword, 10);

  const result = await client.query("INSERT INTO users (username, email, firstName, lastName, pwd, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [newUsername, newEmail, newFirstName, newLastName, hashedPwd, newRole])
     .catch((error) => {
       console.error("Error executing query:", error);
       throw new Error("Query failed");
     });
   res.send(result.rows);

})

export default registrationRouter;