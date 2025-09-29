import express, { Router } from "express";
import client from "../database/index.ts";


const chatRoomRouter: Router = express.Router();

chatRoomRouter.post('/chat/create', async (req, res) => {
  const username = req.body.users;
  console.log("Creating chat room for user:", username);
  console.log("username:", username);
  try {
    const result = await client.query(
      "INSERT INTO chat_rooms (owner_username) VALUES ($1) RETURNING room_id",
      [username]
    );
    //console.log("result.rows[0]", result.rows[0]);
    const newRoom = result.rows[0];
    res.status(201).json({ room_id: newRoom.room_id });
  } catch (error) {
    console.error("Error creating chat room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

chatRoomRouter.post('/chat/join', async (req, res) => {
  const roomID = req.body.roomID;
  const username = req.body.username;
  console.log("User:", username, "is attempting to join room with ID:", roomID);
  try {
    const room = await client.query(
      "SELECT * FROM chat_rooms WHERE room_id = $1",
      [roomID]
    )
      .then((room) => {
        console.log("room.rows[0]", room.rows[0]);
        console.log("username", username);
        if (room.rowCount === 0) {
          res.status(404).json({ error: "Chat room not found" });
          return;
        } else if (room.rows[0].owner_username == username) {
          res.status(400).json({ error: "You're already in the chat room as a owner" });
          return;
        } else if (room.rows[0].users.includes(username)) {
          res.status(400).json({ error: "You're already in the chat room" });
          return;
        } 
      })
      .catch((error) => {
      console.log("error", error);
      return;
    });
   
    const result = await client.query(
      "UPDATE chat_rooms SET users = array_append(users, $2) WHERE room_id = $1 RETURNING *",
      [roomID, username]
    );
    console.log("result.rows[0]", result.rows[0]);

    //console.log("result", result);
    res.status(200).json({ message: `User ${username} joined room ${roomID}` });
  } catch (error) {
    console.error("Error joining chat room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

chatRoomRouter.get('/chat/all', async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM chat_rooms"); 
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



chatRoomRouter.delete('/chat', async (req, res) => {
  //const { roomID, username } = req.body;
  // console.log(req.body);
  const roomID = req.body.roomID;
  const username = req.body.username;
  console.log("Deleting chat room with ID:", roomID, "for user:", username);
  try {
    const roomResult = await client.query(
      "DELETE FROM chat_rooms WHERE room_id = $1 AND owner_username = $2",
      [roomID, username]
    );
    //console.log("roomResult", roomResult);
    if (roomResult.rowCount === 0) {
      res.status(404).json({ error: "Chat room not found or user not authorized" });
      return;
    }
    // const deletedRoom = roomResult.rows[0];
    // console.log("Deleted room:", deletedRoom);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting chat room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

export default chatRoomRouter;