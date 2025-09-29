import express, { Router } from "express";
import client from "../database/index.ts";


const chatRoomRouter: Router = express.Router();

chatRoomRouter.post('/chat/create-room', async (req, res) => {
  const { user } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO chat_rooms (owner_username) VALUES ($1) RETURNING room_id",
      [user]
    );
    //console.log("result.rows[0]", result.rows[0]);
    const newRoom = result.rows[0];
    res.status(201).json({ room_id: newRoom.room_id });
  } catch (error) {
    console.error("Error creating chat room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default chatRoomRouter;