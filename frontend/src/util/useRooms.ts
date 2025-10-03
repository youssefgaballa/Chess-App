import type { UserState } from "../users/userSlice";
import socket from "./socketManager";
import axios from "axios";

export type RoomType = 'Chat' | 'Chess' | 'Other';
export default function useRooms(username: string | null, user: UserState, roomID: number | null,
  setRoomID: (id: number | null) => void, setIsOwner: (isOwner: boolean) => void, setShowModal: (show: boolean) => void, type: RoomType,
  setUsersInRoom?: (value: React.SetStateAction<string[]>) => void, usersInRoom?: string[]) {


  const createRoom = () => {
    console.log("Creating room for user:", username);
    axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/rooms/create`, { users: username },
      { withCredentials: true, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` } }
    )
      .then((response) => {
        if (response?.data?.room_id) {
          setRoomID(response.data.room_id);
          setIsOwner(true);
          if (type === 'Chess' && setUsersInRoom && username) {
            setUsersInRoom([username]);
          }
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
      axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/rooms`,
        {
          data: { roomID: roomID, username: username }, withCredentials: true,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` }
        }
      )
        .then(() => {
          socket.emit("leave room", roomID);
          setRoomID(null);
          if (type === 'Chess' && setUsersInRoom) {
            setUsersInRoom([]);
          }
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
      axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/rooms/join`,
        { roomID: roomId, username: username }, {
          withCredentials: true,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` }
      }
      )
        .then(async () => {
          setRoomID(roomId);
          socket.emit("join room", roomId, username);
          if (type === 'Chess' && setUsersInRoom && username) {
            if (usersInRoom && usersInRoom.length >= 2) {
              setErrorMessage("Room is full");
              return;
            }
            const users = await getRoomUsers(roomId);
            console.log("users in room after joining:", users);
            setUsersInRoom((prevUsers) => {
              return [...new Set([...prevUsers, ...users])];
            });
            console.log("Updated usersInRoom:", usersInRoom);
          }
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
      const response = await axios.patch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/rooms/leave`,
        { roomID: roomID, username: username }, {
          withCredentials: true,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` }
      }
      )
        .then(() => {
          socket.emit("leave room", roomID, username);
          if (type === 'Chess' && setUsersInRoom && username) {
            setUsersInRoom((prevUsers) => {
              return prevUsers.filter((user) => user !== username);
            });
          }
          setRoomID(null);
          console.log("User:", username, "left room with ID:", roomID);
        }).catch((error) => {
          console.log("error", error);
          return;
        });
      console.log("response from leaveRoom: ", response);
    }
  };

  const getRoomUsers = async (roomId: number): Promise<string[]> => {
    if (!roomId === null) return [];
    const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/rooms`,
      {
        params: { roomID: roomId },
        withCredentials: true,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}` }
      }
    )
      .then((res) => {
        console.log("Fetched users in room:", res.data);
        return [res.data.owner_username, ...(res.data.users || [])];
        //return [res.data.owner_username, ...(res.data.users || [])];
      })
      .catch((error) => {
        console.log("error", error);
        return null;
      });
    //console.log("response from getRoomUser: ", response);
    if (response === null || response == undefined) return [];
    return response;

  }

  return { createRoom, deleteRoom, leaveRoom, onJoinRoom, getRoomUser: getRoomUsers };
}


