import express, { Router } from "express";
import client from "../database/index.ts";


const roomsRouter: Router = express.Router();

roomsRouter.post('/rooms/create', async (req, res) => {
  const username = req.body.users;
  console.log("Creating room for user:", username);
  try {
    const result = await client.query(
      "INSERT INTO rooms (owner_username) VALUES ($1) RETURNING room_id",
      [username]
    );
    //console.log("result.rows[0]", result.rows[0]);
    const newRoom = result.rows[0];
    res.status(201).json({ room_id: newRoom.room_id });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

roomsRouter.post('/rooms/join', async (req, res) => {
  const roomID = req.body.roomID;
  const username = req.body.username;
  console.log("User:", username, "is attempting to join room with ID:", roomID);
  try {
    let isError = false;
    const room = await client.query(
      "SELECT * FROM rooms WHERE room_id = $1",
      [roomID]
    )
      .then((room) => {
        console.log("room.rows[0]", room.rows[0]);
        console.log("username", username);
        if (room.rowCount === 0) {
          res.status(404).json({ error: "Room not found" });
          isError = true;
          return;
        } else if (room.rows[0].owner_username == username) {
          res.status(400).json({ error: "You're already in the room as an owner" });
          isError = true;
          return;
        } else if (room.rows[0].users.includes(username)) {
          res.status(400).json({ error: "You're already in the room" });
          isError = true;
          return;
        } 

      })
      .catch((error) => {
      console.log("error", error);
      return;
    });
    console.log("isError", isError);
    if (isError) return;
    console.log("continuing query");

    const result = await client.query(
      "UPDATE rooms SET users = array_append(users, $2) WHERE room_id = $1 RETURNING *",
      [roomID, username]
    );
    console.log("result.rows[0]", result.rows[0]);

    //console.log("result", result);
    res.status(200).json({ message: `User ${username} joined room ${roomID}` });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

roomsRouter.patch('/rooms/leave', async (req, res) => {
  const roomID = req.body.roomID;
  const username = req.body.username;
  console.log("User:", username, "is attempting to leave room with ID:", roomID);
  try {
    const result = await client.query(
      "UPDATE rooms SET users = array_remove(users, $2) WHERE room_id = $1 RETURNING *",
      [roomID, username]
    );  
    //console.log("result.rows[0]", result.rows[0]);
    return res.status(200).json({ message: `User ${username} left room ${roomID}` });
  } catch (error) {
    console.error("Error leaving room:", error);
    res.status(500).json({ error: "Internal server error" });
  }

}
);

roomsRouter.get('/rooms', async (req, res) => {
  const roomID = req.query.roomID;
  console.log("Fetching room with ID:", roomID);
  try {
    const result = await client.query("SELECT * FROM rooms WHERE room_id = $1", [roomID]);
    console.log("result.rows[0]", result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


roomsRouter.get('/rooms/all', async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM rooms"); 
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




roomsRouter.delete('/rooms', async (req, res) => {
  //const { roomID, username } = req.body;
  // console.log(req.body);
  const roomID = req.body.roomID;
  const username = req.body.username;
  console.log("Deleting room with ID:", roomID, "for user:", username);
  try {
    const roomResult = await client.query(
      "DELETE FROM rooms WHERE room_id = $1 AND owner_username = $2",
      [roomID, username]
    );
    //console.log("roomResult", roomResult);
    if (roomResult.rowCount === 0) {
      res.status(404).json({ error: "Room not found or user not authorized" });
      return;
    }
    // const deletedRoom = roomResult.rows[0];
    // console.log("Deleted room:", deletedRoom);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

export default roomsRouter;