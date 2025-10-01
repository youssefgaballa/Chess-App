import { useEffect, useState } from "react";
import socket from "../util/socketManager";
import { selectUser } from "../users/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { JoinRoomModal } from "./JoinRoomModal";

export const ChatRoom = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket with ID in Chatroom:", socket.id);
    });

    socket.on("receive room message", (message: string, sender: string, roomID: number) => {
      console.log(`Received message from ${sender} in room ${roomID}: ${message}`);
      setMessages((prevMessages) => [...prevMessages, { message, sender }]);
    });

    return () => {
      socket.off("connect");
      socket.off("receive room message");
    }
  }, []);

  const user = useSelector(selectUser);
  const username = user?.username || `Guest${Math.floor(Math.random() * 1000).toString()}`;
  const [roomID, setRoomID] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ message: string, sender: string }[]>([]);


  const createRoom = () => {
    console.log("Creating room for user:", username);
    axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chat/create`, { users: username },
      { withCredentials: true, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` } }
    )
      .then((response) => {
        if (response?.data?.room_id) {
          setRoomID(response.data.room_id);
          setIsOwner(true);
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
      axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chat`,
        { data: { roomID: roomID, username: username }, withCredentials: true, 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` } }
      )
        .then(() => {
          socket.emit("leave room", roomID);
          setRoomID(null);
          console.log("Left room with ID:", roomID);
        }).catch((error) => {
          console.log("error", error);
          return;
        });
    }
  };

  const onJoinRoom = (roomId: number, setErrorMessage: (msg: string) => void) => {
    // Logic to join room
    if (roomId) {
      console.log("Joining room with ID:", roomId, "for user:", username);
      axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chat/join`,
        { roomID: roomId, username: username }, { withCredentials: true,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` } }
      )
        .then(() => {
          setRoomID(roomId);
          socket.emit("join room", roomId);
         
          console.log("Joined room with ID:", roomId);
          setShowModal(false);
        })
        .catch((error) => {
          console.log("error", error);
          setErrorMessage(error.response?.data?.error || "Error joining room");
        return;
      });

    }
    
  };

  const leaveRoom = async () => {
    if (roomID) {
      const response = await axios.patch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chat/leave`,
        { roomID: roomID, username: username }, { withCredentials: true,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` } }
      )
        .then(() => {
          socket.emit("leave room", roomID, username);
          setRoomID(null);
          console.log("User:", username, "left room with ID:", roomID);
        }).catch((error) => {
          console.log("error", error);
          return;
        });
      console.log("response from leaveRoom: ", response);
    }
  };

  const onSendMessage = () => {
    // Logic to send message
    if (roomID && message.trim() !== "") {
      console.log("Sending message to room ID:", roomID, "Message:", message);
      setMessages((prevMessages) => [...prevMessages, { message: message, sender: username }]);
      socket.emit("send room message", message, username, roomID);
      setMessage("");
    }
  }

  useEffect(() => {
    console.log("username:", username);
  }, [username]); 

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Chat Room</h2>
        <h2>{roomID ? `Room ID: ${roomID}` : "No active room"}</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            {roomID &&
              <>
              <div className="mt-4 h-64 overflow-y-auto border border-gray-300 rounded-md p-2">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.sender === username ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block px-3 py-1 rounded-full 
                      ${msg.sender === username ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                      {msg.sender}: {msg.message}
                    </span>
                  </div>
                ))}
            </div>
            
                <input
                  type="text"
                  placeholder="Type your message..."
                className="border border-gray-300 rounded-md p-2 w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={() => onSendMessage()}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Send
                </button>
              </>
            }
            {!roomID && <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => createRoom()}>
              Create Room
            </button>}
            {!roomID && <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={() => setShowModal(true)}>
              Join Room
            </button>}
            {roomID && isOwner && <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => deleteRoom()}>
              Delete Room
            </button>}
            {roomID && !isOwner && <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={() => leaveRoom()}>
              Leave Room
            </button>}
            {showModal && <JoinRoomModal setShowModal={setShowModal} onJoinRoom={onJoinRoom}
              errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </div>

        </div>
      </div>
    </>
  );
};