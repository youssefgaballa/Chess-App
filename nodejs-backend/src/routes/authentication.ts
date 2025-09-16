import express, { Router } from "express";
import client from "../database/index.ts";
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const {sign} = jwt;

//TODO, put stuff in controller
const authenticationRouter: Router = express.Router();
// TODO: put duplicate logic (also in registration.ts) in different file

authenticationRouter.post('/authentication', async (req, res) => {
  //console.log(process.env.ACCESS_TOKEN_SECRET);
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
  console.log(passwordMatch);

  if (passwordMatch) {
    const accessToken = sign({ username: foundUser.username },
      `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '20m' });
    const refreshToken = sign({ username: foundUser.username },
      `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '24h' });
    
    const result = await client
      .query("UPDATE users SET refresh_token = $1 WHERE username = $2 RETURNING *", [refreshToken, foundUser.username])
      .catch(() => {
        throw new Error("Query failed");
      });
    const rolesResult = await client
      .query("SELECT user_role FROM users WHERE username = $1", [foundUser.username])
      .then((payload) => { 
        return payload.rows;
      });
    console.log(rolesResult[0]);
    //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });//TODO: set secure to true when deploying
    //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('jwt', refreshToken, { sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ username: foundUser.username, role: rolesResult[0].user_role, access_token: accessToken });
    return;
  }
  res.status(400).json({ 'Client Error': 'Password incorrect' })
});

export default authenticationRouter;