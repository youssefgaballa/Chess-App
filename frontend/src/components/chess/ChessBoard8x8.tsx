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
  const isCapital = true; // Change to true if you want capital letters for columns

  const startGame = () => {
    console.log("Game started!");
    setWhitePawnPositions(["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"]);
  }
  const movePiece = (from: ChessPosition, to: ChessPosition) => {
    console.log("Move piece!");
    setWhitePawnPositions(whitePawnPositions?.map(pos => {
      if (pos === from) return to;
      return pos;
    }));
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
                  <rect
                    key={`${row}-${col}`}
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
          <King color="black" position='d3'/>
      </svg>
      <button onClick={startGame} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start Game</button>
        <button onClick={() => movePiece("a2", "a4")}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Move Piece
        </button>
      </div>

    </>
  )
}

export default ChessBoard8x8;