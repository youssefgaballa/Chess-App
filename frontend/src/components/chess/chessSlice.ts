import { createSlice } from "@reduxjs/toolkit";
import type { ChessColor, ChessPieceType, ChessPosition } from "./chessPiece";

export type PlayerType = {
    isChecked?: boolean;
    isCheckmated?: boolean;

}

export type ChessBoardState = { // hasMoved is mostly relevant for pawns and castling
  pieces: {
    type: ChessPieceType; color: ChessColor;
    position: ChessPosition, isCaptured: boolean, hasMoved: boolean,
    freeMoves: ChessPosition[], replaceMoves: ChessPosition[], 
    isChecked?: boolean, 
  }[];
  turn: ChessColor;
  players: {
    white: PlayerType;
    black: PlayerType;
  }
  lastMove?: { from: ChessPosition; fromIndex: number; to: ChessPosition; toIndex: number; replace: boolean };
  isStalemate?: boolean;
  lastMoveFailed?: boolean;
};

const initialState: ChessBoardState = {
  pieces: [
    {
    type: "pawn", color: "white", position: "a2",
      isCaptured: false, hasMoved: false, freeMoves:['a3','a4'], replaceMoves:[], 
    },
    {
      type: "pawn", color: "white", position: "b2",
      isCaptured: false, hasMoved: false, freeMoves:['b3','b4'], replaceMoves:[], 
    },
    {
      type: "pawn", color: "white", position: "c2",
      isCaptured: false, hasMoved: false, freeMoves:['c3','c4'], replaceMoves:[], 
    },
    {
      type: "pawn", color: "white", position: "d2",
      isCaptured: false, hasMoved: false, freeMoves: ['d3', 'd4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "e2",
      isCaptured: false, hasMoved: false, freeMoves: ['e3', 'e4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "f2",
      isCaptured: false, hasMoved: false, freeMoves: ['f3', 'f4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "g2",
      isCaptured: false, hasMoved: false, freeMoves:['g3','g4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "h2",
      isCaptured: false, hasMoved: false, freeMoves: ['h3', 'h4'], replaceMoves: [], 
    },
    {
      type: "rook", color: "white", position: "a1",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [],
    },
    {
      type: "knight", color: "white", position: "b1",
      isCaptured: false, hasMoved: false, freeMoves:['a3','c3'], replaceMoves: [], 
    },
    {
      type: "bishop", color: "white", position: "c1",
      isCaptured: false, hasMoved: false, freeMoves:[], replaceMoves: [],
    },
    {
      type: "queen", color: "white", position: "d1",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [],
    },
    {
      type: "king", color: "white", position: "e1",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [], isChecked: false, 
    },
    {
      type: "bishop", color: "white", position: "f1",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [],
    },
    {
      type: "knight", color: "white", position: "g1",
      isCaptured: false, hasMoved: false, freeMoves:['f3','h3'], replaceMoves:[], 
    },
    {
      type: "rook", color: "white", position: "h1",
      isCaptured: false, hasMoved: false, freeMoves:[], replaceMoves: [],
    },
    {
      type: "pawn", color: "black", position: "a7",
      isCaptured: false, hasMoved: false, freeMoves:['a6','a5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "b7",
      isCaptured: false, hasMoved: false, freeMoves:['b6','b5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "c7",
      isCaptured: false, hasMoved: false, freeMoves:['c6','c5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "d7",
      isCaptured: false, hasMoved: false, freeMoves: ['d6', 'd5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "e7",
      isCaptured: false, hasMoved: false, freeMoves: ['e6', 'e5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "f7",
      isCaptured: false, hasMoved: false, freeMoves: ['f6', 'f5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "g7",
      isCaptured: false, hasMoved: false, freeMoves:['g6','g5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "h7",
      isCaptured: false, hasMoved: false, freeMoves: ['h6', 'h5'], replaceMoves: [], 
    },
    {
      type: "rook", color: "black", position: "a8",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [],
    },
    {
      type: "knight", color: "black", position: "b8",
      isCaptured: false, hasMoved: false, freeMoves: ['a6', 'c6'], replaceMoves: [], 
    },
    {
      type: "bishop", color: "black", position: "c8",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [],
    },
    {
      type: "queen", color: "black", position: "d8",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [], 
    },
    {
      type: "king", color: "black", position: "e8",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [], isChecked: false, 
    },
    {
      type: "bishop", color: "black", position: "f8",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [], 
    },
    {
      type: "knight", color: "black", position: "g8",
      isCaptured: false, hasMoved: false, freeMoves: ['f6', 'h6'], replaceMoves: [], 
    },
    {
      type: "rook", color: "black", position: "h8",
      isCaptured: false, hasMoved: false, freeMoves: [], replaceMoves: [],
    },
  ],
  players: {
    white: {
      isCheckmated: false,
    },
    black: {
      isCheckmated: false,
    },
  },
  isStalemate: false,
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
    movePiece: (state, action: { payload: { from: ChessPosition; fromIndex: number; to: ChessPosition; toIndex: number; replace: boolean; undo?: boolean } }) => {
      //console.log("------movePiece:");
      const { from, fromIndex, to, toIndex, replace, undo } = action.payload;
      //console.log("from:", from, "fromIndex:", fromIndex, "to:", to,  "toIndex:", toIndex, "replace:", replace, "undo:", undo);
      // console.log("piece.type:", piece?.type);
      state.lastMoveFailed = true;
      if (undo !== undefined) {
        // console.log("undo: ", undo);`
        // console.log("------from:", from, "to:", to);

        const fromPiece = state.pieces[fromIndex];

        let toPiece = null;
        if (replace) {
          toPiece = state.pieces.find(p => p.position === from && p.isCaptured === true);
        }
        
        // console.log("fromPiece:", fromPiece, "toPiece:", toPiece);
        // console.log("fromIndex:", fromIndex, "toIndex:", toIndex);
        // console.log("fromPiece.position:", fromPiece?.position, "toPiece.position:", toPiece?.position);
        // console.log("replace:", replace);
        if (fromPiece && toPiece && replace) {
          // console.log("undoing move, moving piece back to:", to);
          fromPiece.position = to;
          // console.log("fromPiece.position after undoing move:", fromPiece.position);
          // console.log("fromPiece.color:", fromPiece.color);
          // console.log("fromPiece.isCaptured:", fromPiece.isCaptured);
          toPiece.isCaptured = false;
        } else if (fromPiece) {
          fromPiece.position = to;

        }

        return;
      }
      const fromPiece = state.pieces[fromIndex];
      const toPiece = state.pieces[toIndex];
      // if (fromIndex !== -1) {
      //   console.log("fromPiece.position:", fromPiece.position);
      //   console.log("fromPiece.type:", fromPiece.type);
      //   console.log("fromPiece.color:", fromPiece.color);
      // }
      if (fromIndex === -1) {
        // No piece at the source position
        return;
      }
      //console.log("fromPiece.color:", fromPiece.color, "state.turn:", state.turn);
      if (fromPiece.color !== state.turn) {
        console.log("Not your turn!");
        return;
      }
      if (replace) {
        if (fromIndex === -1 || toIndex === -1) {
          // No piece at the source or destination position
          // console.log("No piece at the source or destination position");
          return;
        }
        if (fromPiece.color === toPiece.color ) { //cant take your own piece, except for castling
          if (!(fromPiece.type === "king" && replace && toPiece.type === "rook"
            && fromPiece.color === toPiece.color && fromPiece.hasMoved === false && toPiece.hasMoved === false)) {
            //console.log("Cannot take your own piece!");
            return;
            }

        }
      }
      // console.log("from piece ", fromPiece, "to piece ", toPiece);
      // console.log("fromIndex:", fromIndex, "toIndex:", toIndex);
      //console.log("fromPiece.type:", fromPiece.type);
      if (fromIndex !== -1) {
        switch (fromPiece.type) {
          case "pawn": {
            //console.log("case pawn");
            if (replace) {
              // Pawns can only move forward diagonally when taking a piece
              // spacesMoved should be +-1, direction should be +-1, fileDiff should be 1s
              const direction = fromPiece.color === "white" ? 1 : -1;
              const spacesMoved = (to[1].charCodeAt(0) - from[1].charCodeAt(0));
              const fileDiff = Math.abs(to[0].charCodeAt(0) - from[0].charCodeAt(0));
              //  console.log("direction:", direction, "spacesMoved:", spacesMoved, "fileDiff:", fileDiff);
              if (spacesMoved !== direction || fileDiff !== 1) {
                //  console.log("Invalid move for pawn when taking a piece!");
                return;
              }
            } else {
              // Pawns can only move forward
              const direction = fromPiece.color === "white" ? 1 : -1;
              const spacesToMove = (to[1].charCodeAt(0) - from[1].charCodeAt(0));
            
              // console.log("spacesToMove:", spacesToMove, "direction:", direction);
              // console.log("spacesToMove !== direction && spacesToMove !== direction*2: ", spacesToMove !== direction && spacesToMove !== direction * 2);
              // console.log("to[0] == from[0]: ", to[0] !== from[0]);
              if (to[0] === from[0] && spacesToMove !== direction && spacesToMove !== direction * 2) {
                // console.log("Invalid move for pawn!");
                return;
              } else if (to[0] !== from[0]) {
                // console.log("Invalid move for pawn!");
                return;
              } else if (fromPiece.hasMoved && spacesToMove === direction * 2) {
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
            // Castling: king and rook must not have moved and there must be no pieces between them
            // 4 places for castling.
            if (fromPiece.type === "king" && replace && toPiece.type === "rook"
              && fromPiece.color === toPiece.color && fromPiece.hasMoved === false && toPiece.hasMoved === false) {
              //console.log("Attempting to castle");
              
              if (fromPiece.color === "white" && from === "e1" && to === "h1") { // white kingside castle
                if (!state.pieces.some(p => p.position === "f1" || p.position === "g1")) {
                  fromPiece.position = "g1";
                  fromPiece.hasMoved = true;
                  // Move rook
                  toPiece.position = "f1";
                  toPiece.hasMoved = true;
                }
              } else if (fromPiece.color === "white" && from === "e1" && to === "a1") { // white queenside castle
                if (!state.pieces.some(p => p.position === "d1" || p.position === "c1" || p.position === "b1")) {
                  fromPiece.position = "c1";
                  fromPiece.hasMoved = true;
                  // Move rook
                  toPiece.position = "d1";
                  toPiece.hasMoved = true;
                }
              } else if (fromPiece.color === "black" && from === "e8" && to === "h8") { // black kingside castle
                if (!state.pieces.some(p => p.position === "f8" || p.position === "g8")) {
                  fromPiece.position = "g8";
                  fromPiece.hasMoved = true;
                  // Move rook
                  toPiece.position = "f8";
                  toPiece.hasMoved = true;
                }
              } else if (fromPiece.color === "black" && from === "e8" && to === "a8") { // black queenside castle
                if (!state.pieces.some(p => p.position === "d8" || p.position === "c8" || p.position === "b8")) {
                  fromPiece.position = "c8";
                  fromPiece.hasMoved = true;
                  // Move rook
                  toPiece.position = "d8";
                  toPiece.hasMoved = true;
                }
              } else {
                 console.log("Invalid move for king when castling!");
                return;
              }
              state.lastMoveFailed = false;
              return;
            }

            if (fileDiff > 1 || rankDiff > 1) {
              // console.log("Invalid move for king!");
              return;
            }
            break;
          }
        }
        
      }
      

      fromPiece.position = to;
      //fromPiece.position = to;
      if (replace) {
        // Remove the taken piece
        // console.log("removing piece at toIndex:", toIndex);
        //state.pieces.splice(toIndex, 1);
        toPiece.isCaptured = true;
        fromPiece.replaceMoves = fromPiece.replaceMoves.filter(pos => pos !== to);
      }
      fromPiece.hasMoved = true;
      state.lastMoveFailed = false;

    },
    setValidMoves: (state, action: { payload: {pieceIndex: number} }) => {
      const { pieceIndex} = action.payload;
      const piece = state.pieces[pieceIndex];
      // console.log("----setValidMoves called for piece at position:", piecePos);
      // console.log("pieceIndex:", pieceIndex);
      // console.log("piece.type:", piece?.type);
      // if (piecePos == 'd4') {
      //   //console.log("setValidMoves for d4, piece:", piece);
      // } 
      // console.log("piece for setValidMoves:", piece);
      if (pieceIndex !== -1) {
        piece.freeMoves = [];
        switch (piece.type) {
          case "pawn": {
            const direction = piece.color === "white" ? 1 : -1;
            if (!piece.hasMoved) {
              for (let i = 1; i <= 2; i++) {
                const nextPos = piece.position[0] + (parseInt(piece.position[1]) + i * direction).toString() as ChessPosition;
                if (state.pieces.some(p => p.position === nextPos)) {
                  break; // Blocked by another piece
                }
                piece.freeMoves = piece.freeMoves.concat([nextPos]);
              }
            } else {
              const nextPos = piece.position[0] + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
              if (!state.pieces.some(p => p.position === nextPos)) {
                piece.freeMoves = piece.freeMoves.concat([nextPos]);
              } 
            }
            const diagLeft = String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
            const diagRight = String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
            // if (state.pieces.some(p => p.position === diagLeft && p.color !== piece.color && p.isCaptured === false)) {
            //   if (piece.replaceMoves.includes(diagLeft) === false) {
            //     piece.replaceMoves = piece.replaceMoves.concat([diagLeft]);
            //   }
            // }
            // if (state.pieces.some(p => p.position === diagRight && p.color !== piece.color && p.isCaptured === false)) {
            //   if (piece.replaceMoves.includes(diagRight) === false) {
            //     piece.replaceMoves = piece.replaceMoves.concat([diagRight]);
            //   }
            // }
            piece.replaceMoves = [diagLeft, diagRight].filter(move => {
              if (move[0] >= 'a' && move[0] <= 'h'
                && move[1] >= '1' && move[1] <= '8') {
                return move;
              }
            });
            // console.log("piece after setValidMoves:", piece);
            break;
          } case "knight": {
            //console.log("Calculating valid moves for knight at", piece.position);
            // knight moves in "L" shapes. if there are no pieces blocking the way, it can move to 8 possible positions
            // The possible moves are:
            // console.log("Calculating valid moves for piece at", piece.position);
            // console.log("piece.type:", piece.type);
            // console.log("piece.color:", piece.color);
            const knightMoves: ChessPosition[] = [
              String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + String.fromCharCode(piece.position[1].charCodeAt(0) + 2) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) + 2) + String.fromCharCode(piece.position[1].charCodeAt(0) + 1) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) + 2) + String.fromCharCode(piece.position[1].charCodeAt(0) - 1) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + String.fromCharCode(piece.position[1].charCodeAt(0) - 2) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + String.fromCharCode(piece.position[1].charCodeAt(0) - 2) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) - 2) + String.fromCharCode(piece.position[1].charCodeAt(0) - 1) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) - 2) + String.fromCharCode(piece.position[1].charCodeAt(0) + 1) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + String.fromCharCode(piece.position[1].charCodeAt(0) + 2) as ChessPosition
            ].filter(pos => pos[0] >= 'a' && pos[0] <= 'h' && pos[1] >= '1' && pos[1] <= '8'); // filter out positions that are off the board
            //  if (state.pieces.some(p => p.position === move && p.color === piece.color)) {
            // console.log("knightMoves:", knightMoves);
            piece.freeMoves = knightMoves.filter(move => {
              if (!state.pieces.some(p => p.position === move)) {
                return move; // Can move to an empty square
              }
            });
            // piece.replaceMoves = knightMoves.filter(move => {
            //   if (state.pieces.some(p => p.position === move && p.color !== piece.color && p.isCaptured === false)) {
            //     return move; // Can move to a square occupied by a piece of the opposite color
            //   }
            // });
            piece.replaceMoves = knightMoves;
            // console.log("Free moves for knight at", piece.position, ":", piece.freeMoves);
            //  console.log("Replace moves for knight at", piece.position, ":", piece.replaceMoves);
            break;
          } case "bishop": {
            let bishopMoves: ChessPosition[] = [];
            // Diagonal moves in all four directions
            for (let i = 1; i < 8; i++) {
              bishopMoves.push(
                String.fromCharCode(piece.position[0].charCodeAt(0) + i) + String.fromCharCode(piece.position[1].charCodeAt(0) + i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) + i) + String.fromCharCode(piece.position[1].charCodeAt(0) - i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) - i) + String.fromCharCode(piece.position[1].charCodeAt(0) + i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) - i) + String.fromCharCode(piece.position[1].charCodeAt(0) - i) as ChessPosition,
              );
            }
            bishopMoves = bishopMoves.filter(pos => pos[0] >= 'a' && pos[0] <= 'h' && pos[1] >= '1' && pos[1] <= '8'); // filter out positions that are off the board
            // console.log("bishopMoves before filtering:", bishopMoves);

            const freeMoves = bishopMoves.filter(move => {
              // Check if the path to the move is clear
              const fileDiff = move[0].charCodeAt(0) - piece.position[0].charCodeAt(0);
              const rankDiff = move[1].charCodeAt(0) - piece.position[1].charCodeAt(0);
              // const stepX = fileDiff === 0 ? 0 : fileDiff > 0 ? 1 : -1;
              // const stepY = rankDiff === 0 ? 0 : rankDiff > 0 ? 1 : -1;
              const stepX = Math.sign(fileDiff);
              const stepY = Math.sign(rankDiff);
              
              let clearPath = true;
              for (let j = 1; j <= Math.abs(fileDiff); j++) {
                const currPos: ChessPosition = String.fromCharCode(piece.position[0].charCodeAt(0) + j * stepX) + String.fromCharCode(piece.position[1].charCodeAt(0) + j * stepY) as ChessPosition;
                // console.log("--currPos for bishop move:", currPos);
                if (state.pieces.some(p => {

                  return p.position === currPos && p.isCaptured === false
                })) {
                  // console.log("clearPath = false;");
                  clearPath = false;
                  break;
                }
              }
              if (clearPath) {
                // console.log("clearPath true for move:", move);
                return move;
              }
            });
            //console.log("freeMoves:", freeMoves);
            piece.freeMoves = freeMoves;
            // console.log("Valid moves for bishop at", piece.position, ":", piece.freeMoves);
            piece.replaceMoves = bishopMoves.filter(move => {
              if (state.pieces.some(p => p.position === move && p.isCaptured === false)) {
                const fileDiff = piece.position[0].charCodeAt(0) - move[0].charCodeAt(0);
                const rankDiff = piece.position[1].charCodeAt(0) - move[1].charCodeAt(0);
                const stepX = Math.sign(fileDiff);
                const stepY = Math.sign(rankDiff);

                const intermediateMovePos: ChessPosition = String.fromCharCode(move.charCodeAt(0) +  stepX)
                  + String.fromCharCode(move.charCodeAt(1) +  stepY) as ChessPosition;
                
                // if (move == 'g5') {
                //   console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
                //   console.log("intermediateMovePos for bishop replace move g5:", intermediateMovePos);
                // } else if (move == 'b8') {
                //   console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
                //   console.log("intermediateMovePos for bishop replace move b8:", intermediateMovePos);
                // }
                //console.log("intermediateMovePos for bishop replace move:", intermediateMovePos);
                // Ensure the path to the target piece is clear
                if (intermediateMovePos == piece.position) {
                  //console.log("intermediateMovePos == piece.position", intermediateMovePos, piece.position);
                }
                if ((!state.pieces.some(p => p.position === intermediateMovePos) || intermediateMovePos == piece.position)) {
                  if (piece.freeMoves.includes(intermediateMovePos) === true) {
                    return move; // Can move to a square occupied by a piece of the opposite color
                  } else if (intermediateMovePos == piece.position) {
                    return move;
                  }
                }
              }
            });
            //console.log("Replace moves for bishop at", piece.position, ":", piece.replaceMoves);
            break;
          } case "rook": {
            let rookMoves: ChessPosition[] = [];
            // Horizontal and vertical moves in all four directions
            for (let i = 1; i < 8; i++) {
              rookMoves.push(
                String.fromCharCode(piece.position[0].charCodeAt(0) + i) + piece.position[1] as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) - i) + piece.position[1] as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0)) + String.fromCharCode(piece.position[1].charCodeAt(0) + i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0)) + String.fromCharCode(piece.position[1].charCodeAt(0) - i) as ChessPosition
              );
            }
            rookMoves = rookMoves.filter(pos => pos[0] >= 'a' && pos[0] <= 'h' && pos[1] >= '1' && pos[1] <= '8'); // filter out positions that are off the board
            //console.log("rookMoves:", rookMoves);
            const freeMoves = rookMoves.filter(move => {
              // Check if the path to the move is clear
              const fileDiff = move[0].charCodeAt(0) - piece.position[0].charCodeAt(0);
              const rankDiff = move[1].charCodeAt(0) - piece.position[1].charCodeAt(0);

              const stepX = Math.sign(fileDiff);
              const stepY = Math.sign(rankDiff);
              // if (move == 'a3' || move == 'b2') {
              //   console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
              //   console.log("stepX:", stepX, "stepY:", stepY);
              // }
              let clearPath = true;
              for (let j = 1; j <= Math.max(Math.abs(fileDiff), Math.abs(rankDiff)); j++) {
                const currPos = String.fromCharCode(piece.position[0].charCodeAt(0) + j * stepX)
                  + String.fromCharCode(piece.position[1].charCodeAt(0) + j * stepY);
                if (state.pieces.some(p => p.position === currPos)) {
                  clearPath = false;
                  break;
                }
              }
              if (clearPath) {
                return move;
              }
            });
            //console.log("freeMoves:", freeMoves);
            piece.freeMoves = freeMoves;
            // console.log("Valid moves for rook at", piece.position, ":", piece.freeMoves);
            piece.replaceMoves = rookMoves.filter(move => {
              if (state.pieces.some(p => p.position === move && p.isCaptured === false)) {
                const fileDiff = piece.position[0].charCodeAt(0) - move[0].charCodeAt(0);
                const rankDiff = piece.position[1].charCodeAt(0) - move[1].charCodeAt(0);
                const stepX = Math.sign(fileDiff);
                const stepY = Math.sign(rankDiff);

                const intermediateMovePos: ChessPosition = String.fromCharCode(move.charCodeAt(0) +  stepX)
                  + String.fromCharCode(move.charCodeAt(1) + stepY) as ChessPosition;
                if (move == 'a8') {
                  // console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
                  // console.log("intermediateMovePos for rook replace move a5:", intermediateMovePos);
                }

                if ((!state.pieces.some(p => p.position === intermediateMovePos) || intermediateMovePos == piece.position)) {
                  if (piece.freeMoves.includes(intermediateMovePos) === true) {
                    return move; // Can move to a square occupied by a piece of the opposite color
                  } else if (intermediateMovePos == piece.position) {
                    return move;
                  }
                }
              }
            });
            //console.log("Replace moves for rook at", piece.position, ":", piece.replaceMoves);
            break;
          } case "queen": {
            // Combination of rook and bishop moves
            let bishopMoves: ChessPosition[] = [];
            // Diagonal moves in all four directions
            for (let i = 1; i < 8; i++) {
              bishopMoves.push(
                String.fromCharCode(piece.position[0].charCodeAt(0) + i) + String.fromCharCode(piece.position[1].charCodeAt(0) + i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) + i) + String.fromCharCode(piece.position[1].charCodeAt(0) - i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) - i) + String.fromCharCode(piece.position[1].charCodeAt(0) + i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) - i) + String.fromCharCode(piece.position[1].charCodeAt(0) - i) as ChessPosition,
              );
            }
            bishopMoves = bishopMoves.filter(pos => pos[0] >= 'a' && pos[0] <= 'h' && pos[1] >= '1' && pos[1] <= '8'); // filter out positions that are off the board
            const freeBishopMoves = bishopMoves.filter(move => {
              // Check if the path to the move is clear
              const fileDiff = move[0].charCodeAt(0) - piece.position[0].charCodeAt(0);
              const rankDiff = move[1].charCodeAt(0) - piece.position[1].charCodeAt(0);
              // const stepX = fileDiff === 0 ? 0 : fileDiff > 0 ? 1 : -1;
              // const stepY = rankDiff === 0 ? 0 : rankDiff > 0 ? 1 : -1;
              const stepX = Math.sign(fileDiff);
              const stepY = Math.sign(rankDiff);

              // if (move == 'a3' || move == 'b2') {
              //   console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
              //   console.log("stepX:", stepX, "stepY:", stepY);
              // }
              let clearPath = true;
              for (let j = 1; j <= Math.abs(fileDiff); j++) {
                const currPos = String.fromCharCode(piece.position[0].charCodeAt(0) + j * stepX) + String.fromCharCode(piece.position[1].charCodeAt(0) + j * stepY);
                if (state.pieces.some(p => p.position === currPos)) {
                  clearPath = false;
                  break;
                }
              }
              if (clearPath) {
                return move;
              }
            });


            let rookMoves: ChessPosition[] = [];
            // Horizontal and vertical moves in all four directions
            for (let i = 1; i < 8; i++) {
              rookMoves.push(
                String.fromCharCode(piece.position[0].charCodeAt(0) + i) + piece.position[1] as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0) - i) + piece.position[1] as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0)) + String.fromCharCode(piece.position[1].charCodeAt(0) + i) as ChessPosition,
                String.fromCharCode(piece.position[0].charCodeAt(0)) + String.fromCharCode(piece.position[1].charCodeAt(0) - i) as ChessPosition
              );
            }
            rookMoves = rookMoves.filter(pos => pos[0] >= 'a' && pos[0] <= 'h' && pos[1] >= '1' && pos[1] <= '8'); // filter out positions that are off the board
            //console.log("rookMoves:", rookMoves);
            const freeRookMoves = rookMoves.filter(move => {
              // Check if the path to the move is clear
              const fileDiff = move[0].charCodeAt(0) - piece.position[0].charCodeAt(0);
              const rankDiff = move[1].charCodeAt(0) - piece.position[1].charCodeAt(0);

              const stepX = Math.sign(fileDiff);
              const stepY = Math.sign(rankDiff);
              // if (move == 'a3' || move == 'b2') {
              //   console.log("fileDiff:", fileDiff, "rankDiff:", rankDiff);
              //   console.log("stepX:", stepX, "stepY:", stepY);
              // }
              let clearPath = true;
              for (let j = 1; j <= Math.max(Math.abs(fileDiff), Math.abs(rankDiff)); j++) {
                const currPos = String.fromCharCode(piece.position[0].charCodeAt(0) + j * stepX)
                  + String.fromCharCode(piece.position[1].charCodeAt(0) + j * stepY);
                if (state.pieces.some(p => p.position === currPos)) {
                  clearPath = false;
                  break;
                }
              }
              if (clearPath) {
                return move;
              }
            });
            piece.freeMoves = [...freeBishopMoves, ...freeRookMoves];
            //console.log("Valid moves for queen at", piece.position, ":", piece.freeMoves);
            piece.replaceMoves = [...bishopMoves, ...rookMoves].filter(move => {
              // Check if the move is a valid replacement
              if (state.pieces.some(p => p.position === move && p.isCaptured === false)) {
                const fileDiff = piece.position[0].charCodeAt(0) - move[0].charCodeAt(0);
                const rankDiff = piece.position[1].charCodeAt(0) - move[1].charCodeAt(0);
                const stepX = Math.sign(fileDiff);
                const stepY = Math.sign(rankDiff);

                const intermediateMovePos: ChessPosition = String.fromCharCode(move.charCodeAt(0) + stepX)
                  + String.fromCharCode(move.charCodeAt(1) + stepY) as ChessPosition;
                

                if ((!state.pieces.some(p => p.position === intermediateMovePos) || intermediateMovePos == piece.position)) {
                  if (piece.freeMoves.includes(intermediateMovePos) === true) {
                    return move; // Can move to a square occupied by a piece of the opposite color
                  } else if (intermediateMovePos == piece.position) {
                    return move;
                  }
                }
              }
            });
            break;
          } case "king": {
            // king can move one square in any direction
            // Starting from the right of the current position an moving counter-clockwise, the possible moves are:
            const kingMoves: ChessPosition[] = [
              String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + piece.position[1] as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + String.fromCharCode(piece.position[1].charCodeAt(0) + 1) as ChessPosition,
              piece.position[0] + String.fromCharCode(piece.position[1].charCodeAt(0) + 1) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + String.fromCharCode(piece.position[1].charCodeAt(0) + 1) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + piece.position[1] as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + String.fromCharCode(piece.position[1].charCodeAt(0) - 1) as ChessPosition,
              piece.position[0] + String.fromCharCode(piece.position[1].charCodeAt(0) - 1) as ChessPosition,
              String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + String.fromCharCode(piece.position[1].charCodeAt(0) - 1) as ChessPosition,
            ].filter(pos => pos[0] >= 'a' && pos[0] <= 'h' && pos[1] >= '1' && pos[1] <= '8'); // filter out positions that are off the board
            //console.log("kingMoves:", kingMoves);
            const allOpponentFreeMovesExceptPawns = state.pieces.filter(p => p.color !== piece.color && p.isCaptured === false && p.type !== 'pawn').flatMap(p => p.freeMoves);
            //const allOpponentPawnFreeMoves = state.pieces.filter(p => p.color !== piece.color && p.isCaptured === false && p.type === 'pawn').flatMap(p => p.freeMoves);
            // console.log("----:", state.pieces.filter(p => p.color !== piece.color && p.isCaptured === false && (p.type !== "pawn")).
            //   flatMap(p => p.position + " freeMoves: " + p.freeMoves));
            // console.log("allOpponentFreeMovesExceptPawns:", allOpponentFreeMovesExceptPawns);
            const allOpponentReplaceMoves = state.pieces.filter(p => p.color !== piece.color && p.isCaptured === false).flatMap(p => p.replaceMoves);
            //console.log("allFreeMoves by opponent pieces:", allFreeMoves);
            //console.log("allReplaceMoves by opponent pieces:", allReplaceMoves);
            const freeMoves = kingMoves.filter(move => {
              if (!state.pieces.some(p => p.position === move)
                && allOpponentFreeMovesExceptPawns.includes(move) === false && allOpponentReplaceMoves.includes(move) === false) {
                return move; // Can move to an empty square
              }
            });
            //console.log("freeMoves for king:", freeMoves);
            piece.freeMoves = freeMoves;
            piece.replaceMoves = kingMoves.filter(move => {
              if (state.pieces.some(p => p.position === move && p.color !== piece.color && p.isCaptured === false)
               && allOpponentReplaceMoves.includes(move) === false) {
                return move; // Can move to a square occupied by a piece of the opposite color
              }
            });
            if (piece.hasMoved === false) { // potential castle
              if (piece.color === "white") {
                const kingsideRook = state.pieces.find(p => p.position === "h1" && p.type === "rook" && p.color === "white" && p.hasMoved === false && p.isCaptured === false);
                const queensideRook = state.pieces.find(p => p.position === "a1" && p.type === "rook" && p.color === "white" && p.hasMoved === false && p.isCaptured === false);
                if (kingsideRook && !state.pieces.some(p => p.position === "f1" || p.position === "g1")) { // white eligible for kingside castle
                  piece.replaceMoves = piece.replaceMoves.concat(["h1"]);
                } else if (queensideRook && !state.pieces.some(p => p.position === "d1" || p.position === "c1" || p.position === "b1")) { //white eligible for queenside castle
                  piece.replaceMoves = piece.replaceMoves.concat(["a1"]);
                }
              } else if (piece.color === "black") {
                const kingsideRook = state.pieces.find(p => p.position === "h8" && p.type === "rook" && p.color === "black" && p.hasMoved === false && p.isCaptured === false);
                const queensideRook = state.pieces.find(p => p.position === "a8" && p.type === "rook" && p.color === "black" && p.hasMoved === false && p.isCaptured === false);
                if (kingsideRook && !state.pieces.some(p => p.position === "f8" || p.position === "g8")) { // black eligible for kingside castle
                  piece.replaceMoves = piece.replaceMoves.concat(["h8"]);
                } else if (queensideRook && !state.pieces.some(p => p.position === "d8" || p.position === "c8" || p.position === "b8")) { //black eligible for queenside castle
                  piece.replaceMoves = piece.replaceMoves.concat(["a8"]);
                }
              }
            }

            break;
          } default: break;
        }
      }

    },
    isKingInCheck: (state, action: { payload: { pos: ChessPosition, color: ChessColor } }) => {
      // console.log("----isKingInCheck called for pos:", action.payload.pos, "color:", action.payload.color);
      const { pos, color } = action.payload;
      const king = state.pieces.find(p => p.type === 'king' && p.position === pos);
      if (!king) return;
      // Check if the king is in check
      const isInCheck = state.pieces.some(p => {
        // console.log("p.position:", p.position);
        // console.log("p.color:", p.color);
        // console.log("p.freeMoves.includes(king.position):", p.freeMoves.includes(king.position));
        return p.color !== color && p.replaceMoves.includes(king.position) && p.isCaptured === false;
      });
      king.isChecked = isInCheck;
      state.players[color].isChecked = isInCheck;
    }, 
    isKingCheckMated: (state, action: { payload: { color: ChessColor } }) => {
      // console.log("----isKingCheckMated called for color:", action.payload.color);
      const { color } = action.payload;
      const king = state.pieces.find(p => p.type === 'king' && p.color === color);
      if (!king) return;
   
      if (king.isChecked && king.freeMoves.length === 0 && king.replaceMoves.length === 0) {
        const piecesThatCheckKing = state.pieces.filter(p => {
          return p.color !== color && p.replaceMoves.includes(king.position) && p.isCaptured === false;
        });
        // Check if any other piece of the same color can block the check or capture the checking piece
        const canCapture = state.pieces.some(p => {
          if (p.color === color && p.isCaptured === false && p.type !== 'king') {
            // Check if the piece can move to the square of the attacking piece
            return p.replaceMoves.some(move => {
              return piecesThatCheckKing.some(attacker => attacker.position === move);
            });
          }
          return false;
        });
        // console.log("piecesThatCheckKing:", Array.from(piecesThatCheckKing));
        //  console.log("canCapture:", canCapture);
        if (canCapture) {
          return; // Not checkmate if a piece can capture the checking piece
        } else {
          for (const attacker of piecesThatCheckKing) {
            // Check if any piece can block the check
            if (attacker.type === 'knight' || attacker.type === 'pawn') {
              //console.log("Knight or pawn is checking the king, cannot be blocked.");
              state.players[color].isCheckmated = true;
              return; // Knights and pawns cannot be blocked
            } else if (attacker.type === 'bishop' || attacker.type === 'rook' || attacker.type === 'queen') {
              const fileDiff = attacker.position[0].charCodeAt(0) - king.position[0].charCodeAt(0);
              const rankDiff = attacker.position[1].charCodeAt(0) - king.position[1].charCodeAt(0);
              const stepX = Math.sign(fileDiff);
              const stepY = Math.sign(rankDiff);
              const blockingSquares: ChessPosition[] = [];

              for (let i = 1; i < Math.max(Math.abs(fileDiff), Math.abs(rankDiff)); i++) {
                const blockingSquare = String.fromCharCode(king.position[0].charCodeAt(0) + i * stepX)
                  + String.fromCharCode(king.position[1].charCodeAt(0) + i * stepY) as ChessPosition;
                blockingSquares.push(blockingSquare);
              }
              //console.log("blockingSquares:", blockingSquares);
              for (const square of blockingSquares) {
                const canBlock = state.pieces.some(p => {
                  if (p.color === color && p.isCaptured === false && p.type !== 'king') {
                    return p.freeMoves.includes(square) || p.replaceMoves.includes(square);
                  }
                });
                if (canBlock) {
                  return; // Not checkmate if a piece can block the check
                }
              }
              state.players[color].isCheckmated = true;
            }
          }
        }
        // state.players[color].isCheckmated = true;
       // console.log(`${color} king is checkmated!`);
      }
    },
    setLastMove: (state, action: { payload: { from: ChessPosition, fromIndex: number, to: ChessPosition, toIndex: number, replace: boolean } }) => {
      if (state.lastMoveFailed) {
        return;
      }
      state.lastMove = {
        from: action.payload.from, fromIndex: action.payload.toIndex,
        to: action.payload.to, toIndex: action.payload.fromIndex,
        replace: action.payload.replace
      };

    },
    setTurn: (state, action: { payload: { color: ChessColor } }) => {
      const { color } = action.payload;
      state.turn = color;
      //console.log("Turn set to:", state.turn);
    },
    clearBoard: (state) => {
      state.pieces = [];
      state.turn = "white";
      //window.localStorage.removeItem('user');
    },
  },
});

export const selectBoardState = (state: { chessBoard: typeof initialState }) => state.chessBoard;
export const { setInitialBoard, clearBoard, movePiece, setValidMoves, isKingInCheck, isKingCheckMated, setTurn, setLastMove } = chessBoardSlice.actions;
export default chessBoardSlice.reducer;