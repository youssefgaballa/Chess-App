import { createSlice } from "@reduxjs/toolkit";
import type { ChessColor, ChessPieceType, ChessPosition } from "./chessPiece";

export type ChessBoardState = {
  pieces: { type: ChessPieceType; color: ChessColor; position: ChessPosition }[];
  turn?: ChessColor;
};

const initialState: ChessBoardState = {
  pieces: [],
  turn: "white",
};

const chessBoardSlice = createSlice({
  name: "chessBoard",
  initialState,
  reducers: {
    setInitialBoard: (state) => {
      state.pieces = [
        { type: "pawn", color: "white", position: "a2" }, { type: "pawn", color: "white", position: "b2" },
        { type: "pawn", color: "white", position: "c2" }, { type: "pawn", color: "white", position: "d2" },
        { type: "pawn", color: "white", position: "e2" }, { type: "pawn", color: "white", position: "f2" },
        { type: "pawn", color: "white", position: "g2" }, { type: "pawn", color: "white", position: "h2" },
        { type: "rook", color: "white", position: "a1" }, { type: "knight", color: "white", position: "b1" },
        { type: "bishop", color: "white", position: "c1" }, { type: "queen", color: "white", position: "d1" },
        { type: "king", color: "white", position: "e1" }, { type: "bishop", color: "white", position: "f1" },
        { type: "knight", color: "white", position: "g1" }, { type: "rook", color: "white", position: "h1" },
        { type: "pawn", color: "black", position: "a7" }, { type: "pawn", color: "black", position: "b7" },
        { type: "pawn", color: "black", position: "c7" }, { type: "pawn", color: "black", position: "d7" },
        { type: "pawn", color: "black", position: "e7" }, { type: "pawn", color: "black", position: "f7" },
        { type: "pawn", color: "black", position: "g7" }, { type: "pawn", color: "black", position: "h7" },
        { type: "rook", color: "black", position: "a8" }, { type: "knight", color: "black", position: "b8" },
        { type: "bishop", color: "black", position: "c8" }, { type: "queen", color: "black", position: "d8" },
        { type: "king", color: "black", position: "e8" }, { type: "bishop", color: "black", position: "f8" },
        { type: "knight", color: "black", position: "g8" }, { type: "rook", color: "black", position: "h8" },
      ]
      state.turn = "white";
      //window.localStorage.setItem('user', JSON.stringify({ ...state, accessToken: null }));
    },
    movePiece: (state, action: { payload: { from: ChessPosition; to: ChessPosition } }) => {
      const { from, to } = action.payload;
      const fromIndex = state.pieces.findIndex(p => p.position === from);
      const toIndex = state.pieces.findIndex(p => p.position === to);
      if (fromIndex === -1) {
        // No piece at the source position
        return;
      }
      if (state.pieces[fromIndex].color !== state.turn) {
        console.log("Not your turn!");
        return;
      }
      // Case: taking a free square
      if (fromIndex !== -1 && toIndex === -1) {
        // Move the piece
        state.pieces[fromIndex].position = to;
        // Change turn
        state.turn = state.turn === "white" ? "black" : "white";
      }
    },
    clearBoard: (state) => {
      state.pieces = [];
      state.turn = "white";
      //window.localStorage.removeItem('user');
    },
  },
});

export const selectBoardState = (state: { chessBoard: typeof initialState }) => state.chessBoard;
export const { setInitialBoard, clearBoard, movePiece } = chessBoardSlice.actions;
export default chessBoardSlice.reducer;