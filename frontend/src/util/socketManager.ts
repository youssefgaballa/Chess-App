import { useEffect } from "react";
import {io} from "socket.io-client";

const SOCKET_URL = `http://localhost:${import.meta.env.VITE_HTTP_PORT}`; // Replace with your server URL
const socket = io(SOCKET_URL, { withCredentials: true });

export const useSocket = () => {
  return useEffect(() => {
    console.log("Connecting to socket...");
    socket.connect();
    return () => {
      console.log("Disconnecting from socket...");
      socket.disconnect();

    };
  }, []);
};

export default socket;
// You can add event listeners and emit events as needed