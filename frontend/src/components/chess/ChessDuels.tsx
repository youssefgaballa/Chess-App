import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, type UserState } from "../../users/userSlice";
import socket from "../../util/socketManager";
import useRooms from "../../util/useRooms";
import { JoinRoomModal } from "../JoinRoomModal";
import ChessBoard8x8 from "./ChessBoard8x8";
import { Colors } from "./ChessBoardSolo";

export const ChessDuels = () => {

  const user: UserState = useSelector(selectUser);
  const username = user?.username;
  const [roomID, setRoomID] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [spectators, setSpectators] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [usersInRoom, setUsersInRoom] = useState<string[]>([]);
  useEffect(() => {
    console.log("usersInRoom:", usersInRoom);
    console.log("opponent:", opponent);
    console.log("spectators:", spectators);
  }, [usersInRoom, opponent, spectators]);
  const { createRoom, deleteRoom, leaveRoom, onJoinRoom, getRooms } = useRooms(username, user, roomID, setRoomID, setIsOwner,
    setShowModal, 'Chess', setUsersInRoom, usersInRoom, setOpponent, setSpectators);
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket with ID in ChessDuels:", socket.id);
    });
    socket.on("receive room message", (message: string, sender: string, roomID: number) => {
      console.log(`Received message from ${sender} in room ${roomID}: ${message}`);
      //setMessages((prevMessages) => [...prevMessages, { message, sender }]);
      setUsersInRoom((prevUsers) => {
        if (!prevUsers.includes(sender)) {
          return [...prevUsers, sender];
        }
        return prevUsers;
      });
      setOpponent(sender);
    });
    (async function fetchRooms() {
      console.log("------fetchRooms()");
      await getRooms(username).then((rooms) => {
        console.log("Available rooms:", rooms);
        console.log("rooms length:", rooms.length);
        if (rooms.length > 0) {
          // Auto-join the first available room for demo purposes
          console.log("rooms[0].room_id", rooms[0].room_id);
          setRoomID(rooms[0].room_id);
          
          let usersInRoom: string[] = [];
          if (rooms[0].owner_username != undefined) {
            usersInRoom = usersInRoom.concat(rooms[0].owner_username);
          }
          if (rooms[0].users != undefined) {
            usersInRoom = usersInRoom.concat(rooms[0].users);
          }
          setUsersInRoom(usersInRoom);
          if (username === rooms[0].owner_username) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
          socket.emit("join room", roomID, username);
          
        }
      });
    })();   
    console.log("roomID:", roomID);
    return () => {
      socket.off("connect");
      socket.off("receive room message");
    }
  }, []);

  useEffect(() => {
    console.log("roomID changed:", roomID);
  },[roomID]);

  return (
    <div className="flex-col items-center justify-center mt-4">
      <h2>{roomID ? `Room ID: ${roomID}` : "No active room"}</h2><br/>

      <div className="border-t border-gray-200">
        {!roomID && <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => createRoom()}>
          Create Room
        </button>}
        {!roomID && <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={() => setShowModal(true)}>
          Join Room
        </button>}
        {
          roomID && usersInRoom.length == 2 && isOwner && (
            <> 
              {opponent && <h3>Opponent: {opponent}</h3>}
              <ChessBoard8x8 colors={Colors['light/dark']} side={'white'} roomID={roomID} />
              {username && <h3>You are: {username}</h3>}
            </>
          )
        }
        {
          roomID && usersInRoom.length == 2 && !isOwner && (
            <> {opponent && <h3>Opponent: {opponent}</h3>}
              <ChessBoard8x8 colors={Colors['light/dark']} side={'black'} roomID={roomID} />
              {username && <h3>You are: {username}</h3>}
            </>
          )
        }
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
)
}