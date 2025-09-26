import { createSlice } from "@reduxjs/toolkit";
import type { ChessColor, ChessPieceType, ChessPosition } from "./chessPiece";

export type ChessBoardState = { // hasMoved is mostly relevant for pawns and castling
  pieces: {
    type: ChessPieceType; color: ChessColor;
    position: ChessPosition, isCaptured: boolean, hasMoved: boolean,
    validMoves: ChessPosition[], replaceMoves: ChessPosition[]
  }[];
  turn?: ChessColor;
};

const initialState: ChessBoardState = {
  pieces: [
    {
    type: "pawn", color: "white", position: "a2",
      isCaptured: false, hasMoved: false, validMoves:['a3','a4'], replaceMoves:[]
    },
    {
      type: "pawn", color: "white", position: "b2",
      isCaptured: false, hasMoved: false, validMoves:['b3','b4'], replaceMoves:[]
    },
    {
      type: "pawn", color: "white", position: "c2",
      isCaptured: false, hasMoved: false, validMoves:['c3','c4'], replaceMoves:[]
    },
    {
      type: "pawn", color: "white", position: "d2",
      isCaptured: false, hasMoved: false, validMoves: ['d3', 'd4'], replaceMoves: []
    },
    {
      type: "pawn", color: "white", position: "e2",
      isCaptured: false, hasMoved: false, validMoves: ['e3', 'e4'], replaceMoves: []
    },
    {
      type: "pawn", color: "white", position: "f2",
      isCaptured: false, hasMoved: false, validMoves: ['f3', 'f4'], replaceMoves: []
    },
    {
      type: "pawn", color: "white", position: "g2",
      isCaptured: false, hasMoved: false, validMoves:['g3','g4'], replaceMoves: []
    },
    {
      type: "pawn", color: "white", position: "h2",
      isCaptured: false, hasMoved: false, validMoves: ['h3', 'h4'], replaceMoves: []
    },
    {
      type: "rook", color: "white", position: "a1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "knight", color: "white", position: "b1",
      isCaptured: false, hasMoved: false, validMoves:['a3','c3'], replaceMoves: []
    },
    {
      type: "bishop", color: "white", position: "c1",
      isCaptured: false, hasMoved: false, validMoves:[], replaceMoves: []
    },
    {
      type: "queen", color: "white", position: "d1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "king", color: "white", position: "e1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "bishop", color: "white", position: "f1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "knight", color: "white", position: "g1",
      isCaptured: false, hasMoved: false, validMoves:['f3','h3'], replaceMoves:[]
    },
    {
      type: "rook", color: "white", position: "h1",
      isCaptured: false, hasMoved: false, validMoves:[], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "a7",
      isCaptured: false, hasMoved: false, validMoves:['a6','a5'], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "b7",
      isCaptured: false, hasMoved: false, validMoves:['b6','b5'], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "c7",
      isCaptured: false, hasMoved: false, validMoves:['c6','c5'], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "d7",
      isCaptured: false, hasMoved: false, validMoves:['d6','d5'], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "e7",
      isCaptured: false, hasMoved: false, validMoves: ['e6', 'e5'], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "f7",
      isCaptured: false, hasMoved: false, validMoves:['f6','f5'], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "g7",
      isCaptured: false, hasMoved: false, validMoves:['g6','g5'], replaceMoves: []
    },
    {
      type: "pawn", color: "black", position: "h7",
      isCaptured: false, hasMoved: false, validMoves: ['h6', 'h5'], replaceMoves: []
    },
    {
      type: "rook", color: "black", position: "a8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "knight", color: "black", position: "b8",
      isCaptured: false, hasMoved: false, validMoves:['a6','c6'], replaceMoves: []
    },
    {
      type: "bishop", color: "black", position: "c8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "queen", color: "black", position: "d8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "king", color: "black", position: "e8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "bishop", color: "black", position: "f8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
    {
      type: "knight", color: "black", position: "g8",
      isCaptured: false, hasMoved: false, validMoves:['f6','h6'], replaceMoves: []
    },
    {
      type: "rook", color: "black", position: "h8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: []
    },
  ],
  turn: "white",
};

const chessBoardSlice = createSlice({
  name: "chessBoard",
  initialState,
  reducers: {
    setInitialBoard: (state) => {
      // for (const piece of state.pieces) {
      //   console.log("piece ", piece);
      //   // state.pieces.push({ ...piece }); // Create a shallow copy of each piece
      // }
      state.pieces = [...initialState.pieces]
      //console.log("setInitialBoard:", state.pieces);
      state.turn = "white";
      //window.localStorage.setItem('user', JSON.stringify({ ...state, accessToken: null }));
    },
    movePiece: (state, action: { payload: { from: ChessPosition; to: ChessPosition, replace: boolean } }) => {
      // console.log("movePiece action.payload:", action.payload);
      const { from, to, replace } = action.payload;
      const fromIndex = state.pieces.findIndex(p => p.position === from);
      const toIndex = state.pieces.findIndex(p => p.position === to);
      const fromPiece = state.pieces[fromIndex];
      const toPiece = state.pieces[toIndex];
      // console.log("fromPiece:", fromPiece, "toPiece:", toPiece);
      if (fromIndex === -1) {
        // No piece at the source position
        return;
      }
      if (fromPiece.color !== state.turn) {
        // console.log("Not your turn!");
        return;
      }
      if (replace) {
        if (fromIndex === -1 || toIndex === -1) {
          // No piece at the source or destination position
          // console.log("No piece at the source or destination position");
          return;
        }
        if (fromPiece.color === toPiece.color) {
          // console.log("Cannot take your own piece!");
          return;
        }
      }
      console.log("from piece ", fromPiece, "to piece ", toPiece);
      console.log("fromIndex:", fromIndex, "toIndex:", toIndex);
      if (fromIndex !== -1 && toIndex === -1) {
        switch (fromPiece.type) {
          case "pawn": {
            if (replace) {
              // Pawns can only move forward diagonally when taking a piece
              // spacesMoved should be +-1, direction should be +-1, fileDiff should be 1s
              const direction = fromPiece.color === "white" ? 1 : -1;
              const spacesMoved = (to[1].charCodeAt(0) - from[1].charCodeAt(0));
              const fileDiff = Math.abs(to[0].charCodeAt(0) - from[0].charCodeAt(0));
              // console.log("direction:", direction, "spacesMoved:", spacesMoved, "fileDiff:", fileDiff);
              if (spacesMoved !== direction || fileDiff !== 1) {
                // console.log("Invalid move for pawn when taking a piece!");
                return;
              }
            } else {
              // Pawns can only move forward
              const direction = fromPiece.color === "white" ? 1 : -1;
              const spacesMoved = (to[1].charCodeAt(0) - from[1].charCodeAt(0));
            
              // console.log("spacesMoved:", spacesMoved, "direction:", direction);
              // console.log("spacesMoved !== direction && spacesMoved !== direction*2: ", spacesMoved !== direction && spacesMoved !== direction * 2);
              // console.log("to[0] == from[0]: ", to[0] !== from[0]);
              if (to[0] === from[0] && spacesMoved !== direction && spacesMoved !== direction * 2) {
                // console.log("Invalid move for pawn!");
                return;
              } else if (to[0] !== from[0]) {
                // console.log("Invalid move for pawn!");
                return;
              } else if (fromPiece.hasMoved && spacesMoved === direction * 2) {
                // console.log("Invalid move for pawn! Cant move 2 spaces if already moved once");
                return;
              }
            }
            break;
          } case "knight": {
            const fileDiff = to[0].charCodeAt(0) - from[0].charCodeAt(0);
            const rankDiff = to[1].charCodeAt(0) - from[1].charCodeAt(0);
            if (!(Math.abs(fileDiff) === 2 && Math.abs(rankDiff) === 1)
              && !(Math.abs(fileDiff) === 1 && Math.abs(rankDiff) === 2)) {
              // console.log("Invalid move for knight!");
              return;
            }
            
            break;
          } case "bishop": {
            const fileDiff = to[0].charCodeAt(0) - from[0].charCodeAt(0);
            const rankDiff = to[1].charCodeAt(0) - from[1].charCodeAt(0);
            // console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
            if (Math.abs(fileDiff) !== Math.abs(rankDiff)) {
              // console.log("Invalid move for bishop!");
              return;
            }
            for (let i = 1; i < Math.abs(fileDiff); i++) {
              const intermediateSquare = String.fromCharCode(from[0].charCodeAt(0) + i * Math.sign(fileDiff))
                + String.fromCharCode(from[1].charCodeAt(0) + i * Math.sign(rankDiff));
              // console.log(`intermediateSquare at iteration ${i}:`, intermediateSquare);
              if (state.pieces.some(p => p.position === intermediateSquare)) {
                // console.log("Invalid move for bishop! intermediate square occupied:", intermediateSquare);
                return;
              }
            }
            break;
          } case "rook": {
            const fileDiff = to[0].charCodeAt(0) - from[0].charCodeAt(0);
            const rankDiff = to[1].charCodeAt(0) - from[1].charCodeAt(0);
            // console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
            if (fileDiff !== 0 && rankDiff !== 0) {
              // console.log("Invalid move for rook!");
              return;
            }
        
            const step = fileDiff !== 0 ? Math.sign(fileDiff) : Math.sign(rankDiff);
            const direction = fileDiff !== 0 ? 'file' : 'rank';
            const maxDiff = Math.max(Math.abs(fileDiff), Math.abs(rankDiff));
            // console.log("step:", step, "direction:", direction, "maxDiff:", maxDiff);
            for (let i = 1; i < maxDiff; i++) {
              if (direction === 'file' && fileDiff === 0) break;
              if (direction === 'rank' && rankDiff === 0) break;
              const intermediateSquare = direction === 'file'
                ? String.fromCharCode(from[0].charCodeAt(0) + i * step) + from[1]
                : from[0] + String.fromCharCode(from[1].charCodeAt(0) + i * step);
              // console.log(`intermediateSquare at iteration ${i}:`, intermediateSquare);
              if (state.pieces.some(p => p.position === intermediateSquare)) {
                // console.log("Invalid move for rook! intermediate square occupied:", intermediateSquare);
                return;
              }
            }
            break;
          } case "queen": {
            const fileDiff = to[0].charCodeAt(0) - from[0].charCodeAt(0);
            const rankDiff = to[1].charCodeAt(0) - from[1].charCodeAt(0);
            // console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
            if (Math.abs(fileDiff) !== Math.abs(rankDiff) && (fileDiff !== 0 && rankDiff !== 0)) {
              // console.log("Invalid move for Queen!");
              return;
            }
            if (fileDiff === 0 || rankDiff === 0) {// Case: Rook-like move
              const step = fileDiff !== 0 ? Math.sign(fileDiff) : Math.sign(rankDiff);
              const direction = fileDiff !== 0 ? 'file' : 'rank';
              const maxDiff = Math.max(Math.abs(fileDiff), Math.abs(rankDiff));
              // console.log("step:", step, "direction:", direction, "maxDiff:", maxDiff);
              for (let i = 1; i < maxDiff; i++) {
                if (direction === 'file' && fileDiff === 0) break;
                if (direction === 'rank' && rankDiff === 0) break;
                const intermediateSquare = direction === 'file'
                  ? String.fromCharCode(from[0].charCodeAt(0) + i * step) + from[1]
                  : from[0] + String.fromCharCode(from[1].charCodeAt(0) + i * step);
                // console.log(`intermediateSquare at iteration ${i}:`, intermediateSquare);
                if (state.pieces.some(p => p.position === intermediateSquare)) {
                  // console.log("Invalid move for Queen! intermediate square occupied:", intermediateSquare);
                  return;
                }
              }
            } else if (Math.abs(fileDiff) === Math.abs(rankDiff)) {// Case: Bishop-like move
              for (let i = 1; i < Math.abs(fileDiff); i++) {
                const intermediateSquare = String.fromCharCode(from[0].charCodeAt(0) + i * Math.sign(fileDiff))
                  + String.fromCharCode(from[1].charCodeAt(0) + i * Math.sign(rankDiff));
                // console.log(`intermediateSquare at iteration ${i}:`, intermediateSquare);
                if (state.pieces.some(p => p.position === intermediateSquare)) {
                  // console.log("Invalid move for Queen! intermediate square occupied:", intermediateSquare);
                  return;
                }
              }
            }
            
            break;
          } case "king": {
            const fileDiff = Math.abs(to[0].charCodeAt(0) - from[0].charCodeAt(0));
            const rankDiff = Math.abs(to[1].charCodeAt(0) - from[1].charCodeAt(0));
            // console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
            if (fileDiff > 1 || rankDiff > 1) {
              // console.log("Invalid move for king!");
              return;
            }
            break;
          }
        }
        
      }
      // Move the piece
      fromPiece.position = to;
      //fromPiece.position = to;
      if (replace) {
        // Remove the taken piece
        // console.log("removing piece at toIndex:", toIndex);
        //state.pieces.splice(toIndex, 1);
        toPiece.isCaptured = true;
      }
      // Change turn
      fromPiece.hasMoved = true;
      state.turn = state.turn === "white" ? "black" : "white";
    },
    setValidMoves: (state, action: { payload: { piecePos: ChessPosition } }) => {
      const { piecePos } = action.payload;
      const pieceIndex = state.pieces.findIndex(p => p.position === piecePos);
      const piece = state.pieces[pieceIndex];

      // console.log("piece for setValidMoves:", piece);
      if (pieceIndex !== -1) {
        piece.validMoves = [];
        switch (piece.type) {
          case "pawn": {
            const direction = piece.color === "white" ? 1 : -1;
            for (let i = 1; i <= 2; i++) {
              const nextPos = piece.position[0] + (parseInt(piece.position[1]) + i * direction).toString() as ChessPosition;
              if (state.pieces.some(p => p.position === nextPos)) {
                break; // Blocked by another piece
              }
              piece.validMoves = piece.validMoves.concat([nextPos]);
            }
            const diagLeft = String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
            const diagRight = String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
            if (state.pieces.some(p => p.position === diagLeft && p.color !== piece.color)) {
              if (piece.replaceMoves.includes(diagLeft) === false) {
                piece.replaceMoves = piece.replaceMoves.concat([diagLeft]);
              }
            }
            if (state.pieces.some(p => p.position === diagRight && p.color !== piece.color)) {
              if (piece.replaceMoves.includes(diagRight) === false) {
                piece.replaceMoves = piece.replaceMoves.concat([diagRight]);
              }
            }
            // console.log("piece after setValidMoves:", piece);
            break;
          } case "knight": {

            break;
          } case "bishop": {

            break;
          } case "rook": {

            break;
          } case "queen": {

            break;
          } case "king": {

            break;
          } default: break;
        }
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
export const { setInitialBoard, clearBoard, movePiece, setValidMoves } = chessBoardSlice.actions;
export default chessBoardSlice.reducer;