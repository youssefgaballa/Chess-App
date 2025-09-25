import { useLayoutEffect, useRef, useState } from "react";
import ChessPiece, { type ChessPosition } from "./chessPiece";
import { Pawn } from "./Pawn";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";
import { useDispatch, useSelector } from "react-redux";
import { selectBoardState, setInitialBoard, movePiece } from "./chessSlice";
import { SelectedColors } from "./ChessBoardWrapper";


const ChessBoard8x8: React.FC<{ colors: string[] }> = ({ colors }) => {
  const dispatch = useDispatch();

  const boardSize = 700; // 700px x 700px
  const tileSize = 75;
  const padding = 50;
  const isCapital = true; // Change to true if you want capital letters for columns
  const [isPieceSelected, setIsPieceSelected] = useState<ChessPosition | null>(null);
  const board = useSelector(selectBoardState);
  const whitePawnPieces = board.pieces.filter(p => p.type === "pawn" && p.color === "white");
  const whiteKnightPieces = board.pieces.filter(p => p.type === "knight" && p.color === "white");
  const whiteBishopPieces = board.pieces.filter(p => p.type === "bishop" && p.color === "white");
  const whiteRookPieces = board.pieces.filter(p => p.type === "rook" && p.color === "white");
  const whiteQueenPieces = board.pieces.filter(p => p.type === "queen" && p.color === "white");
  const whiteKingPieces = board.pieces.filter(p => p.type === "king" && p.color === "white");
  
  const blackPawnPieces = board.pieces.filter(p => p.type === "pawn" && p.color === "black");
  const blackKnightPieces = board.pieces.filter(p => p.type === "knight" && p.color === "black");
  const blackBishopPieces = board.pieces.filter(p => p.type === "bishop" && p.color === "black");
  const blackRookPieces = board.pieces.filter(p => p.type === "rook" && p.color === "black");
  const blackQueenPieces = board.pieces.filter(p => p.type === "queen" && p.color === "black");
  const blackKingPieces = board.pieces.filter(p => p.type === "king" && p.color === "black");

  const startGame = () => {
    console.log("Game started!");

    dispatch(setInitialBoard());
  }
  const updatePiecePosition = (pos: ChessPosition) => {
    console.log("Move piece for position:", pos);
    if (!isPieceSelected) {
      setIsPieceSelected(pos);
    } else {
      const from = isPieceSelected;
      const to = pos;
      setIsPieceSelected(null);
      // Update piece positions
      dispatch(movePiece({ from, to }));
      
    }
  }
  

  useLayoutEffect(() => {
    if (isPieceSelected) {
      console.log("Piece selected:", isPieceSelected);
      // Highlight the selected piece on the board
    }
  },[isPieceSelected]);


  return (
    <>
      <div className='flex flex-col items-center mt-4'>
        <span>Chess Board</span>
        <svg width={`${boardSize}`} height={`${boardSize }`} className="border border-black">
          <rect x={padding} y={padding} width={boardSize - 2*padding} height={boardSize - 2*padding} fill="white" />
          {Array.from({ length: 8 }, (_, row) => {
            return Array.from({ length: 8 }, (_, col) => {
              const pos: ChessPosition = String.fromCharCode(97 + col) + (8 - row) as ChessPosition;
              return (
              <>
                  { row == 0 ? <text x={padding + col * tileSize + tileSize / 2} y={row * tileSize + tileSize / 2}
                    textAnchor="middle" dominantBaseline="middle">
                    {isCapital ? String.fromCharCode(65 + col) : String.fromCharCode(97 + col)}
                  </text> : null}
                  { col == 0 ? <text x={col*tileSize+tileSize/2} y={padding + row * tileSize + tileSize / 2}
                    textAnchor="middle" dominantBaseline="middle">
                    {8 - row}
                  </text> : null}
                  <rect key={`${row}-${col}`} onClick={() => updatePiecePosition(String.fromCharCode(97 + col) + (8 - row) as ChessPosition)}
                  x={padding + col * tileSize}
                  y={padding + row * tileSize}
                  width={tileSize}
                  height={tileSize}
                    fill={(row + col) % 2 === 0 ? (isPieceSelected === pos ? SelectedColors['green'] : colors[0]) : (isPieceSelected === pos ? SelectedColors['green'] : colors[1])}
                />
              </>
            );
          });
          })}
          {whitePawnPieces?.map((piece, index) => (
            <Pawn key={index} color="white" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {blackPawnPieces?.map((piece, index) => (
            <Pawn key={index} color="black" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {whiteKnightPieces?.map((piece, index) => (
            <Knight key={index} color="white" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {blackKnightPieces?.map((piece, index) => (
            <Knight key={index} color="black" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {whiteBishopPieces?.map((piece, index) => (
            <Bishop key={index} color="white" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {blackBishopPieces?.map((piece, index) => (
            <Bishop key={index} color="black" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {whiteRookPieces?.map((piece, index) => (
            <Rook key={index} color="white" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {blackRookPieces?.map((piece, index) => (
            <Rook key={index} color="black" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {whiteQueenPieces?.map((piece, index) => (
            <Queen key={index} color="white" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {blackQueenPieces?.map((piece, index) => (
            <Queen key={index} color="black" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {whiteKingPieces?.map((piece, index) => (
            <King key={index} color="white" position={piece.position} onClick={updatePiecePosition} />
          ))}
          {blackKingPieces?.map((piece, index) => (
            <King key={index} color="black" position={piece.position} onClick={updatePiecePosition} />
          ))}
      </svg>
      <button onClick={startGame} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start Game</button>

      </div>

    </>
  )
}

export default ChessBoard8x8;