import express, { Router } from "express";
import client from "../database/index.ts";
import jwt from 'jsonwebtoken';
const { verify } = jwt;

//TODO, put stuff in controller

const refreshRouter: Router = express.Router();

refreshRouter.post('/refresh', async (req, res) => {
  console.log("----/refresh");
  const refreshToken = req.cookies?.refreshToken;
  console.log("refreshToken", refreshToken);
  // if (!cookies?.jwt) {
  //   return res.status(401).json({ 'Client Error': 'No refresh token in cookies, please login again' });
  // }
  // const refreshToken = cookies.jwt;
  const response = await client.query("SELECT username FROM users WHERE refresh_token = $1", [refreshToken])
  const foundUser = response.rows[0];
  //console.log("foundUser: ", foundUser);
  if (!foundUser) {
    return res.status(403).json({ 'Client Error': 'No user found for provided refresh token, please login again' });
  }

  verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (err: any, decoded: any) => {
    //console.log("decoded: ",decoded);
    if (err || foundUser.username !== decoded.username) {
      //console.log("err from verify in /refresh: ", err);
      return res.status(403).json({ 'Client Error': 'Invalid refresh token, please login again' });
    }
    const accessToken = jwt.sign({ username: decoded.username },
      `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '25s' });
    console.log("new access token: ", accessToken);
    res.json({ accessToken });
  });
  

  //res.cookie('jwt', response.rows[0]?.refresh_token, { sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

});

export default refreshRouter;