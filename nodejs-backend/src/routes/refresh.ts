import express, { Router } from "express";
import client from "../database/index.ts";

const refreshRouter: Router = express.Router();

refreshRouter.post('/refresh', async (req, res) => {
  const cookies = req.cookies;
  console.log("cookies", cookies);
  console.log("jwt", cookies?.jwt);
  // if (!cookies?.jwt) {
  //   return res.status(401).json({ 'Client Error': 'No refresh token in cookies, please login again' });
  // }
  // const refreshToken = cookies.jwt;
  const response = await client.query("SELECT refresh_token FROM users WHERE username = $1", [req.body.username])
  console.log(response.rows[0]);
  res.cookie('jwt', response.rows[0]?.refresh_token, { sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
  return res.json({ 'refreshToken': response.rows[0]?.refresh_token });
});

export default refreshRouter;