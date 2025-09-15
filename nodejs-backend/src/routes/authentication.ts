import express, { Router } from "express";
import client from "../database/index.ts";
import { compare } from 'bcrypt';
import sign  from 'jsonwebtoken';

const authenticationRouter: Router = express.Router();
// TODO: put duplicate logic (also in registration.ts) in different file

authenticationRouter.post('/authentication', async (req, res) => {
  console.log(process.env.ACCESS_TOKEN_SECRET);
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

  //console.log(passwordMatch);
  // if (passwordMatch) {
  //   const accessToken = sign({ username: foundUser.username },
  //     `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '60s' });
  //   const refreshToken = sign({ username: foundUser.username },
  //     `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '24hr' });
  // }
  res.send('yay')
});

export default authenticationRouter;