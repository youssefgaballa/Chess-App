import express, { Router } from "express";
import client from "../database/index.ts";

const authenticationRouter: Router = express.Router();
