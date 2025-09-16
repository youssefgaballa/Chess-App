import express, { Router } from "express";
import client from "../database/index.ts";

const refreshRouter: Router = express.Router();

refreshRouter.post('/refresh', async (req, res) => {
  // const cookies = req.cookies;
  // console.log(cookies);
  // console.log(cookies?.jwt);
  // if (!cookies?.jwt) {
  //   return res.status(401).json({ 'Client Error': 'No refresh token in cookies, please login again' });
  // }
  // const refreshToken = cookies.jwt;
  const response = await client.query("SELECT refresh_token FROM users WHERE username = $1", [req.body.username])
  console.log(response.rows[0]);
  return res.json({ 'refreshToken': response.rows[0]?.refresh_token });
});

export default refreshRouter;