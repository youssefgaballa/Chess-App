import express, { Router } from "express";
import client from "../database/database.ts";


export type ChessPieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
export type ChessPosition = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
export type ChessColor = "white" | "black";
export type PlayerType = {
  isChecked?: boolean;
  isCheckmated?: boolean;

}
export type ChessPiece = {
  type: ChessPieceType;
  color: ChessColor;
  position: ChessPosition;
  isCaptured: boolean;
  hasMoved: boolean;
  freeMoves: ChessPosition[];
  replaceMoves: ChessPosition[];
  isChecked?: boolean;
  pendingPromotion?: boolean; // for pawns that reach the end of the board
};

export type ChessBoardState = { // hasMoved is mostly relevant for pawns and castling
  pieces: ChessPiece[];
  turn: ChessColor;
  players: {
    white: PlayerType;
    black: PlayerType;
  }
  lastMove?: {
    from: ChessPosition; fromIndex: number;
    to: ChessPosition; toIndex: number; replace: boolean
  };
  lastMoveFailed?: boolean;
};

export const chessRouter = Router();

chessRouter.post("/chessboard", async (req, res) => {
  // for creating a new board
  console.log("--- POST /chessboard");
  const board: ChessBoardState = req.body.board;
  const roomID = req.body.roomID;
  
  if (!board || !roomID) {
    res.status(400).json({ 'Client Error': 'Board and roomID are required.' });
    return;
  }
  const pieces: ChessPiece[] = board.pieces;
  try {
    await client.query(`INSERT INTO chess_games (room_id, turn, player_white, player_black)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [roomID, board.turn, board.players.white, board.players.black])
      .catch((error) => {
        console.error("Error executing chess game creation query:", error);
        throw new Error("Query failed");
      });

    for (let piece of pieces) {
      await client.query(
        `INSERT INTO chess_pieces (room_id, piece_type, color, position, is_captured, has_moved,
         free_moves, replace_moves, is_checked, pending_promotion)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [roomID, piece.type, piece.color, piece.position, piece.isCaptured, piece.hasMoved,
        piece.freeMoves, piece.replaceMoves, piece.isChecked || null,
        piece.pendingPromotion || null]
      ).catch((error) => {
        console.error("Error executing piece insertion query:", error);
        throw new Error("Query failed");
      });
    }
    // const result = await client.query(
    //   "INSERT INTO chessboards (board, owner) VALUES ($1, $2) RETURNING *",
    //   [board, owner]
    // );
    //console.log("result.rows[0]", result.rows[0]);
    // const newRoom = result.rows[0];
    // res.status(201).json(newRoom);
    res.status(201).json({ message: "Chess pieces saved successfully" });
  } catch (error) {
    console.error("Error saving chess pieces:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

chessRouter.get("/chessboard/:roomID", async (req, res) => {
  console.log(`----- GET  /chessboard/${req.params.roomID}`);
  const roomID = req.params.roomID;
  try {
    const piecesResult = await client.query("SELECT * FROM chess_pieces WHERE room_id = $1", [roomID]);
    const pieces = piecesResult.rows;
    const boardResult = await client.query("SELECT * FROM chess_games WHERE room_id = $1", [roomID]);
    const board = boardResult.rows[0];
    board.pieces = pieces;
    res.status(200).json(board);
  } catch (error) {
    console.error("Error fetching chess pieces:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

chessRouter.delete("/rooms", async (req, res) => {
  const { roomID, username } = req.body;

  if (!roomID || !username) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    await client.query("DELETE FROM rooms WHERE id = $1 AND owner = $2", [
      roomID,
      username,
    ]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
