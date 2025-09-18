import jwt  from 'jsonwebtoken';
import express, { Router } from "express";

const { verify } = jwt;

const verifyAccessTokenRouter: Router = express.Router();

verifyAccessTokenRouter.use((req, res, next) => {
  console.log("-----verifyAccessToken middleware called");
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('bearer ')) {
    return res.sendStatus(401); //unauthorized
  }
  console.log("authHeader", authHeader);
  const accessToken = authHeader.split(' ')[1]!;
  const isVerified = verify(accessToken,
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err, decoded) => {
      if (err) {
        console.log("err from verify in /verifyAccessToken: ", err);
        return res.sendStatus(403);
      } //invalid token
      console.log("decoded from verifyAccessToken middleware: ", decoded);
      res.locals.username = (decoded as any).username;
      // (req as any).username = (decoded as any).username;
      next();
    }
  );
});
export default verifyAccessTokenRouter;