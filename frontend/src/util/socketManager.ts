import { useEffect } from "react";
import {io} from "socket.io-client";
import { selectUser } from "../users/userSlice";
import { useSelector } from "react-redux";

const SOCKET_URL = `http://localhost:${import.meta.env.VITE_HTTP_PORT}`; // Replace with your server URL that you specify in .env
const socket = io(SOCKET_URL, { withCredentials: true });

// Only needs to be used once (App.tsx)
export const useSocket = () => {
  const user = useSelector(selectUser);

  return useEffect(() => {
    // console.log("Connecting to socket...");
    if (user.username !== null) {
      socket.connect();
    }
    return () => {
      // console.log("Disconnecting from socket...");
      socket.disconnect();

    };
  }, [user]);
};

export default socket;
// You can add event listeners and emit events as needed