import type { ChessBoardState } from "./chessSlice";
import axios from "axios";

export const saveBoard = async (board: ChessBoardState, roomID: number | null) => {
  // localStorage.setItem("chessBoard", JSON.stringify(board));
  if (!roomID) return;
  try {
    const result = await axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chessboard`, {
      board,
      roomID
    });
    return result.data;
  } catch (error) {
    console.error("Error saving chess board:", error);
    return;
  }
 
};

export const loadBoard = async (roomID: number): Promise<ChessBoardState | null> => {

  try {
    const result = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/chessboard/${roomID}`);
    return result.data;
  } catch (error) {
    console.error("Error loading chess board:", error);
    return null;
  }
};

// export const clearBoard = () => {
//   localStorage.removeItem("chessBoard");
// };
