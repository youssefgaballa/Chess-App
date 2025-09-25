import { useLayoutEffect, useState } from "react";
import { type ChessPosition } from "./chessPiece";
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

  const startGame = () => {
    console.log("Game started!");

    dispatch(setInitialBoard());
  }
  const updatePiecePosition = (pos: ChessPosition) => {
    console.log("updatePiecePosition:", pos);
    if (!isPieceSelected) {
      const isPieceAtPos = board.pieces.find(p => p.position === pos);
      if (isPieceAtPos) {
        setIsPieceSelected(pos);
      }
      return;
    } else {
      const from = isPieceSelected;
      const to = pos;
      setIsPieceSelected(null);
      // Update piece positions
      const isPieceAtPos = board.pieces.find(p => p.position === pos);
      if (isPieceAtPos) {
        dispatch(movePiece({ from, to, replace: true }));

      } else {
        dispatch(movePiece({ from, to, replace: false }));
      }
      
    }
  }

  const onPieceClick = (pos: ChessPosition) => {
    console.log("Piece clicked at position:", pos);
    if (!isPieceSelected) {
      setIsPieceSelected(pos);
    } else {
      dispatch(movePiece({ from: isPieceSelected, to: pos, replace: true }));
      setIsPieceSelected(null);
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
          {
            board.pieces.map((p, index) => {
              switch(p.type) {
                case "pawn":
                  return (<Pawn key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "knight":
                  return (<Knight key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "bishop":
                  return (<Bishop key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "rook":
                  return (<Rook key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "queen":
                  return (<Queen key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "king":
                  return (<King key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                default:
                  return null;
              }
            })
          }
          
      </svg>
      <button onClick={startGame} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start Game</button>

      </div>

    </>
  )
}

export default ChessBoard8x8;