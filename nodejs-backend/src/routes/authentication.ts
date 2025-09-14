import express, { Router } from "express";
import client from "../database/index.ts";
import { compare } from 'bcrypt';
import sign  from 'jsonwebtoken';

const authenticationRouter: Router = express.Router();
// TODO: put duplicate logic (also in registration.ts) in different file

authenticationRouter.post('/authentication', async (req, res) => {
  const { username: username, password: password} = req.body;
  if (!username || !password) {
    res.status(400).json({ 'Client Error': 'Username and password are required.' })
    return;
  }
  const foundUser = await client
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((payload) => {
      return payload.rows[0];
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  //console.log(foundUser);
  if (!foundUser) {
    res.status(400).json({ 'Client Error': 'Username not found' })
    return;
  }
  const passwordMatch = await compare(password, foundUser.pwd);
  // TODO: figureout how to use jwt
  res.send('yay')
});

export default authenticationRouter;