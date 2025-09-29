import { useState } from "react";
import socket from "../util/socketManager";
import { selectUser } from "../users/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";

export const ChatRoom = () => {
  socket.on("connect", () => {
    console.log("Connected to socket with ID in Chatroom:", socket.id);


  });
  const user = useSelector(selectUser);
  const username = user?.username || "Guest";
  const [roomID, setRoomID] = useState<number | null>(null);


  const createRoom = () => {
    console.log("Creating room for user:", username);
    const response = axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chat`, { users: username },
      { withCredentials: true, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` } }
    )
      .then((response) => {
        if (response?.data?.room_id) {
          setRoomID(response.data.room_id);
          console.log("Room created with ID:", response.data.room_id);
          // Logic to create/join room can be added here
          socket.emit("create room", response.data.room_id);
        }
      }).catch((error) => {
        console.log("error", error);
        return;
      });
  };

  const deleteRoom = () => {
    if (roomID) {
      const response = axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chat`,
        { data: { roomID: roomID, username: username }, withCredentials: true, 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` } }
      )
        .then((response) => {
          socket.emit("leave room", roomID);
          setRoomID(null);
          console.log("Left room with ID:", roomID);
        }).catch((error) => {
          console.log("error", error);
          return;
        });
    }
  };

  const onSendMessage = () => {
    // Logic to send message
    console.log("Message sent!");
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Chat Room</h2>
        <h2>{roomID ? `Room ID: ${roomID}` : "No active room"}</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <div className="mt-4 h-64 overflow-y-auto border border-gray-300 rounded-md p-2">
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button onClick={() => onSendMessage()}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send
            </button>
            {!roomID && <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => createRoom()}>
              Create Room
            </button>}
            {roomID && <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => deleteRoom()}>
              Delete Room
            </button>}
          </div>

        </div>
      </div>
    </>
  );
};