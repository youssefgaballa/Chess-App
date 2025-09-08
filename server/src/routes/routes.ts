import express, { Router } from "express";

const router: Router = express.Router();

let text = "";

router.get("/data", (req, res) => {
  res.send(text);
});

router.post("/data", (req, res) => {
  const { text: newText } = req.body;
  text = newText;
  setTimeout(() => {
    res.send({ status: true });
  }, 2000);
});


export default router;