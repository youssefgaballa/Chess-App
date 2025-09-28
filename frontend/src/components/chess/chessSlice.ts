import { createSlice } from "@reduxjs/toolkit";
import type { ChessColor, ChessPieceType, ChessPosition } from "./chessPiece";


export type ChessBoardState = { // hasMoved is mostly relevant for pawns and castling
  pieces: {
    type: ChessPieceType; color: ChessColor;
    position: ChessPosition, isCaptured: boolean, hasMoved: boolean,
    validMoves: ChessPosition[], replaceMoves: ChessPosition[], 
    isChecked?: boolean, isKingCheckedLastMove?: boolean
  }[];
  turn: ChessColor;
  lastMove?: { from: ChessPosition; fromIndex: number; to: ChessPosition; toIndex: number; replace: boolean };

};

const initialState: ChessBoardState = {
  pieces: [
    {
    type: "pawn", color: "white", position: "a2",
      isCaptured: false, hasMoved: false, validMoves:['a3','a4'], replaceMoves:[], 
    },
    {
      type: "pawn", color: "white", position: "b2",
      isCaptured: false, hasMoved: false, validMoves:['b3','b4'], replaceMoves:[], 
    },
    {
      type: "pawn", color: "white", position: "c2",
      isCaptured: false, hasMoved: false, validMoves:['c3','c4'], replaceMoves:[], 
    },
    {
      type: "pawn", color: "white", position: "d2",
      isCaptured: false, hasMoved: false, validMoves: ['d3', 'd4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "e2",
      isCaptured: false, hasMoved: false, validMoves: ['e3', 'e4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "f2",
      isCaptured: false, hasMoved: false, validMoves: ['f3', 'f4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "g2",
      isCaptured: false, hasMoved: false, validMoves:['g3','g4'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "white", position: "h2",
      isCaptured: false, hasMoved: false, validMoves: ['h3', 'h4'], replaceMoves: [], 
    },
    {
      type: "rook", color: "white", position: "a1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [],
    },
    {
      type: "knight", color: "white", position: "b1",
      isCaptured: false, hasMoved: false, validMoves:['a3','c3'], replaceMoves: [], 
    },
    {
      type: "bishop", color: "white", position: "c1",
      isCaptured: false, hasMoved: false, validMoves:[], replaceMoves: [],
    },
    {
      type: "queen", color: "white", position: "d1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [],
    },
    {
      type: "king", color: "white", position: "e1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [], isChecked: false, isKingCheckedLastMove: false
    },
    {
      type: "bishop", color: "white", position: "f1",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [],
    },
    {
      type: "knight", color: "white", position: "g1",
      isCaptured: false, hasMoved: false, validMoves:['f3','h3'], replaceMoves:[], 
    },
    {
      type: "rook", color: "white", position: "h1",
      isCaptured: false, hasMoved: false, validMoves:[], replaceMoves: [],
    },
    {
      type: "pawn", color: "black", position: "a7",
      isCaptured: false, hasMoved: false, validMoves:['a6','a5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "b7",
      isCaptured: false, hasMoved: false, validMoves:['b6','b5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "c7",
      isCaptured: false, hasMoved: false, validMoves:['c6','c5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "d7",
      isCaptured: false, hasMoved: false, validMoves: ['d6', 'd5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "e7",
      isCaptured: false, hasMoved: false, validMoves: ['e6', 'e5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "f7",
      isCaptured: false, hasMoved: false, validMoves: ['f6', 'f5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "g7",
      isCaptured: false, hasMoved: false, validMoves:['g6','g5'], replaceMoves: [], 
    },
    {
      type: "pawn", color: "black", position: "h7",
      isCaptured: false, hasMoved: false, validMoves: ['h6', 'h5'], replaceMoves: [], 
    },
    {
      type: "rook", color: "black", position: "a8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [],
    },
    {
      type: "knight", color: "black", position: "b8",
      isCaptured: false, hasMoved: false, validMoves: ['a6', 'c6'], replaceMoves: [], 
    },
    {
      type: "bishop", color: "black", position: "c8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [],
    },
    {
      type: "queen", color: "black", position: "d8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [], 
    },
    {
      type: "king", color: "black", position: "e8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [], isChecked: false, isKingCheckedLastMove: false
    },
    {
      type: "bishop", color: "black", position: "f8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [], 
    },
    {
      type: "knight", color: "black", position: "g8",
      isCaptured: false, hasMoved: false, validMoves: ['f6', 'h6'], replaceMoves: [], 
    },
    {
      type: "rook", color: "black", position: "h8",
      isCaptured: false, hasMoved: false, validMoves: [], replaceMoves: [],
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
    movePiece: (state, action: { payload: { from: ChessPosition; fromIndex: number; to: ChessPosition; toIndex: number; replace: boolean; undo?: boolean } }) => {
      //console.log("------movePiece:");
      const { from, fromIndex, to, toIndex, replace, undo } = action.payload;
      // console.log("piece.type:", piece?.type);
      
      if (undo !== undefined) {
        // console.log("undo: ", undo);
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
            if (fileDiff > 1 || rankDiff > 1) {
              // console.log("Invalid move for king!");
              return;
            }
            break;
          }
        }
        
      }
      
      const king = state.pieces.find(p => p.type === 'king' && p.color === fromPiece.color);
      if (!king) {
        // console.log("No king found for color:", fromPiece.color);
        return;
      }
      if (king.isChecked) {
        // const isInCheck = state.pieces.some(p => {
        //   // console.log("p.position:", p.position);
        //   // console.log("p.color:", p.color);
        //   // console.log("p.validMoves.includes(king.position):", p.replaceMoves.includes(king.position));
        //   return p.color !== fromPiece.color && p.replaceMoves.includes(king.position);
        // });
        //console.log("isInCheck:", isInCheck);
        //console.log("King is in check, cannot move other pieces until the check is resolved!");
        king.isKingCheckedLastMove = true;
        //console.log("state.isKingCheckedLastMove:", state.isKingCheckedLastMove);
        //state.turn = state.turn === "white" ? "black" : "white";
        //console.log("turn changed to:", state.turn);
      } else {
        king.isKingCheckedLastMove = false;
      }
        // Simulate the move to see if it puts the king in check
      // Move the piece
      fromPiece.position = to;
      //fromPiece.position = to;
      if (replace) {
        // Remove the taken piece
        // console.log("removing piece at toIndex:", toIndex);
        //state.pieces.splice(toIndex, 1);
        toPiece.isCaptured = true;
        fromPiece.replaceMoves = fromPiece.replaceMoves.filter(pos => pos !== to);
      }
      // Change turn
      fromPiece.hasMoved = true;
      // the indeces are swapped so it works correclty when undoing a move
      state.lastMove = { from: from, fromIndex: toIndex, to: to, toIndex: fromIndex, replace };
      //state.turn = state.turn === "white" ? "black" : "white";
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
        piece.validMoves = [];
        switch (piece.type) {
          case "pawn": {
            const direction = piece.color === "white" ? 1 : -1;
            if (!piece.hasMoved) {
              for (let i = 1; i <= 2; i++) {
                const nextPos = piece.position[0] + (parseInt(piece.position[1]) + i * direction).toString() as ChessPosition;
                if (state.pieces.some(p => p.position === nextPos)) {
                  break; // Blocked by another piece
                }
                piece.validMoves = piece.validMoves.concat([nextPos]);
              }
            } else {
              const nextPos = piece.position[0] + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
              if (!state.pieces.some(p => p.position === nextPos)) {
                piece.validMoves = piece.validMoves.concat([nextPos]);
              } 
            }
            const diagLeft = String.fromCharCode(piece.position[0].charCodeAt(0) - 1) + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
            const diagRight = String.fromCharCode(piece.position[0].charCodeAt(0) + 1) + (parseInt(piece.position[1]) + direction).toString() as ChessPosition;
            if (state.pieces.some(p => p.position === diagLeft && p.color !== piece.color && p.isCaptured === false)) {
              if (piece.replaceMoves.includes(diagLeft) === false) {
                piece.replaceMoves = piece.replaceMoves.concat([diagLeft]);
              }
            }
            if (state.pieces.some(p => p.position === diagRight && p.color !== piece.color && p.isCaptured === false)) {
              if (piece.replaceMoves.includes(diagRight) === false) {
                piece.replaceMoves = piece.replaceMoves.concat([diagRight]);
              }
            }
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
            piece.validMoves = knightMoves.filter(move => {
              if (!state.pieces.some(p => p.position === move)) {
                return move; // Can move to an empty square
              }
            });
            piece.replaceMoves = knightMoves.filter(move => {
              if (state.pieces.some(p => p.position === move && p.color !== piece.color && p.isCaptured === false)) {
                return move; // Can move to a square occupied by a piece of the opposite color
              }
            });
            // console.log("Valid moves for knight at", piece.position, ":", piece.validMoves);
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
            const freeMoves = bishopMoves.filter(move => {
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
                const currPos: ChessPosition = String.fromCharCode(piece.position[0].charCodeAt(0) + j * stepX) + String.fromCharCode(piece.position[1].charCodeAt(0) + j * stepY) as ChessPosition;
                if (state.pieces.some(p => p.position === currPos)) {
                  clearPath = false;
                  break;
                }
              }
              if (clearPath) {
                return move;
              }
              state.lastMove = state.lastMove
            });
            //console.log("freeMoves:", freeMoves);
            piece.validMoves = freeMoves;
            // console.log("Valid moves for bishop at", piece.position, ":", piece.validMoves);
            piece.replaceMoves = bishopMoves.filter(move => {
              if (state.pieces.some(p => p.position === move && p.color !== piece.color && p.isCaptured === false)) {
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
                  if (piece.validMoves.includes(intermediateMovePos) === true) {
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
            piece.validMoves = freeMoves;
            // console.log("Valid moves for rook at", piece.position, ":", piece.validMoves);
            piece.replaceMoves = rookMoves.filter(move => {
              if (state.pieces.some(p => p.position === move && p.color !== piece.color && p.isCaptured === false)) {
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
                  if (piece.validMoves.includes(intermediateMovePos) === true) {
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
            piece.validMoves = [...freeBishopMoves, ...freeRookMoves];
            //console.log("Valid moves for queen at", piece.position, ":", piece.validMoves);
            piece.replaceMoves = [...bishopMoves, ...rookMoves].filter(move => {
              // Check if the move is a valid replacement
              if (state.pieces.some(p => p.position === move && p.color !== piece.color && p.isCaptured === false)) {
                const fileDiff = piece.position[0].charCodeAt(0) - move[0].charCodeAt(0);
                const rankDiff = piece.position[1].charCodeAt(0) - move[1].charCodeAt(0);
                const stepX = Math.sign(fileDiff);
                const stepY = Math.sign(rankDiff);

                const intermediateMovePos: ChessPosition = String.fromCharCode(move.charCodeAt(0) + stepX)
                  + String.fromCharCode(move.charCodeAt(1) + stepY) as ChessPosition;
                

                if ((!state.pieces.some(p => p.position === intermediateMovePos) || intermediateMovePos == piece.position)) {
                  if (piece.validMoves.includes(intermediateMovePos) === true) {
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
            const freeMoves = kingMoves.filter(move => {
              if (!state.pieces.some(p => p.position === move)) {
                return move; // Can move to an empty square
              }
            });
            //console.log("freeMoves for king:", freeMoves);
            piece.validMoves = freeMoves;
            piece.replaceMoves = kingMoves.filter(move => {
              if (state.pieces.some(p => p.position === move && p.color !== piece.color && p.isCaptured === false)) {
                return move; // Can move to a square occupied by a piece of the opposite color
              }
            });
            //console.log("replaceMoves for king at", piece.position, ":", piece.replaceMoves);
            break;
          } default: break;
        }
      }


    },
    isKingInCheck: (state, action: { payload: { pos: ChessPosition, color: ChessColor } }) => {
      const { pos, color } = action.payload;
      const king = state.pieces.find(p => p.type === 'king' && p.position === pos);
      if (!king) return;
      // Check if the king is in check
      const isInCheck = state.pieces.some(p => {
        // console.log("p.position:", p.position);
        // console.log("p.color:", p.color);
        // console.log("p.validMoves.includes(king.position):", p.replaceMoves.includes(king.position));
        return p.color !== color && p.replaceMoves.includes(king.position) && p.isCaptured === false;
      });
      king.isChecked = isInCheck;
    }, 
    setTurn: (state, action: { payload: { color: ChessColor } }) => {
      const { color } = action.payload;
      state.turn = color;
      console.log("Turn set to:", state.turn);
    },
    clearBoard: (state) => {
      state.pieces = [];
      state.turn = "white";
      //window.localStorage.removeItem('user');
    },
  },
});

export const selectBoardState = (state: { chessBoard: typeof initialState }) => state.chessBoard;
export const { setInitialBoard, clearBoard, movePiece, setValidMoves, isKingInCheck, setTurn } = chessBoardSlice.actions;
export default chessBoardSlice.reducer;