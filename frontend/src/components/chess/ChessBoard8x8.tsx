import { useLayoutEffect, useRef, useState } from "react";
import ChessPiece, { type ChessPosition } from "./chessPiece";
import { Pawn } from "./Pawn";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";


const ChessBoard8x8: React.FC<{ colors: string[] }> = ({ colors }) => {
  const boardSize = 700; // 700px x 700px
  const tileSize = 75;
  const padding = 50;
  const [whitePawnPositions, setWhitePawnPositions] = useState<ChessPosition[]>();
  const [blackPawnPositions, setBlackPawnPositions] = useState<ChessPosition[]>();
  const [whiteKnightPositions, setWhiteKnightPositions] = useState<ChessPosition[]>();
  const [blackKnightPositions, setBlackKnightPositions] = useState<ChessPosition[]>();
  const [whiteBishopPositions, setWhiteBishopPositions] = useState<ChessPosition[]>();
  const [blackBishopPositions, setBlackBishopPositions] = useState<ChessPosition[]>();
  const [whiteRookPositions, setWhiteRookPositions] = useState<ChessPosition[]>();
  const [blackRookPositions, setBlackRookPositions] = useState<ChessPosition[]>();
  const [whiteQueenPosition, setWhiteQueenPosition] = useState<ChessPosition[]>();
  const [blackQueenPosition, setBlackQueenPosition] = useState<ChessPosition[]>();
  const [whiteKingPosition, setWhiteKingPosition] = useState<ChessPosition[]>();
  const [blackKingPosition, setBlackKingPosition] = useState<ChessPosition[]>();
  const isCapital = true; // Change to true if you want capital letters for columns
  const [isSquareSelected, setIsSquareSelected] = useState<ChessPosition | null>(null);

  const startGame = () => {
    console.log("Game started!");
    setWhitePawnPositions(["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"]);
    setBlackPawnPositions(["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]);
    setWhiteKnightPositions(["b1", "g1"]);
    setBlackKnightPositions(["b8", "g8"]);
    setWhiteBishopPositions(["c1", "f1"]);
    setBlackBishopPositions(["c8", "f8"]);
    setWhiteRookPositions(["a1", "h1"]);
    setBlackRookPositions(["a8", "h8"]);
    setWhiteQueenPosition(["d1"]);
    setBlackQueenPosition(["d8"]);
    setWhiteKingPosition(["e1"]);
    setBlackKingPosition(["e8"]);
  }
  const movePiece = (pos: ChessPosition) => {
    console.log("Move piece for position:", pos);
    if (!isSquareSelected) {
      setIsSquareSelected(pos);
    } else {

      setIsSquareSelected(null);
      // Update piece positions
      

    }
  }


  return (
    <>
      <div className='flex flex-col items-center mt-4'>
        <span>Chess Board</span>
        <svg width={`${boardSize}`} height={`${boardSize }`} className="border border-black">
          <rect x={padding} y={padding} width={boardSize - 2*padding} height={boardSize - 2*padding} fill="white" />
          {Array.from({ length: 8 }, (_, row) => {
            return Array.from({ length: 8 }, (_, col) => {

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
                  <rect key={`${row}-${col}`} onClick={() => movePiece(String.fromCharCode(97 + col) + (8 - row) as ChessPosition)}
                  x={padding + col * tileSize}
                  y={padding + row * tileSize}
                  width={tileSize}
                  height={tileSize}
                  fill={(row + col) % 2 === 0 ? colors[0] : colors[1]}
                />
              </>
            );
          });
          })}
          {whitePawnPositions?.map((pos, index) => (
            <Pawn key={index} color="white" position={pos} />
          ))}
          {blackPawnPositions?.map((pos, index) => (
            <Pawn key={index} color="black" position={pos} />
          ))}
          {whiteKnightPositions?.map((pos, index) => (
            <Knight key={index} color="white" position={pos} />
          ))}
          {blackKnightPositions?.map((pos, index) => (
            <Knight key={index} color="black" position={pos} />
          ))}
          {whiteBishopPositions?.map((pos, index) => (
            <Bishop key={index} color="white" position={pos} />
          ))}
          {blackBishopPositions?.map((pos, index) => (
            <Bishop key={index} color="black" position={pos} />
          ))}
          {whiteRookPositions?.map((pos, index) => (
            <Rook key={index} color="white" position={pos} />
          ))}
          {blackRookPositions?.map((pos, index) => (
            <Rook key={index} color="black" position={pos} />
          ))}
          {whiteQueenPosition?.map((pos, index) => (
            <Queen key={index} color="white" position={pos} />
          ))}
          {blackQueenPosition?.map((pos, index) => (
            <Queen key={index} color="black" position={pos} />
          ))}
          {whiteKingPosition?.map((pos, index) => (
            <King key={index} color="white" position={pos} />
          ))}
          {blackKingPosition?.map((pos, index) => (
            <King key={index} color="black" position={pos} />
          ))}
      </svg>
      <button onClick={startGame} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start Game</button>

      </div>

    </>
  )
}

export default ChessBoard8x8;