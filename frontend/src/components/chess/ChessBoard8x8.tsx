import { useLayoutEffect, useState } from "react";
import { type ChessPosition } from "./chessPiece";
import { Pawn } from "./Pawn";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";
import { useDispatch, useSelector } from "react-redux";
import { selectBoardState, setInitialBoard, movePiece, setValidMoves } from "./chessSlice";
import { SelectedColors } from "./ChessBoardWrapper";


const ChessBoard8x8: React.FC<{ colors: string[] }> = ({ colors }) => {
  const dispatch = useDispatch();
  const boardSize = 700; // 700px x 700px
  const tileSize = 75;
  const padding = 50;
  const isCapital = true; // Change to true if you want capital letters for columns
  const [selectedPos, setSelectedPos] = useState<ChessPosition | null>(null);
  const board = useSelector(selectBoardState);

  

  //console.log("Board state:", board);
  const startGame = () => {
    //console.log("Game started!");

    dispatch(setInitialBoard());
  }
  const updatePiecePosition = (pos: ChessPosition) => {
    //console.log("updatePiecePosition:", pos);
    if (!selectedPos) {
      const pieceAtPos = board.pieces.find(p => p.position === pos);
      if (pieceAtPos) {
        dispatch(setValidMoves({ piecePos: pos }));
        setSelectedPos(pos);
      }
      return;
    } else {
      const from = selectedPos;
      const to = pos;
      setSelectedPos(null);
      // Update piece positions
      const pieceAtPos = board.pieces.find(p => p.position === pos);
      if (pieceAtPos) {
        dispatch(movePiece({ from, to, replace: true }));

      } else {
        dispatch(movePiece({ from, to, replace: false }));
      }
      
    }
  }

  const onPieceClick = (pos: ChessPosition) => {
    //console.log("Piece clicked at position:", pos);
    const pieceAtPos = board.pieces.find(p => p.position === pos);
    if (!selectedPos) {
      //if (!pieceAtPos) return; // should never occur since this listens to piece clicks
      dispatch(setValidMoves({ piecePos: pos }));
      setSelectedPos(pos);
    } else {
      dispatch(movePiece({ from: selectedPos, to: pos, replace: true }));
      //dispatch(setValidMoves({ piecePos: pos }));
      setSelectedPos(null);
    }
  }


  // useLayoutEffect(() => {
  //   if (selectedPos) {
  //     //console.log("Piece selected:", selectedPos);
  //     // Highlight the selected piece on the board
  //   }
  // },[selectedPos]);


  return (
    <>
      <div className='flex flex-col items-center mt-4'>
        <span>Chess Board</span>
        <svg width={`${boardSize}`} height={`${boardSize }`} className="border border-black">
          <rect x={padding} y={padding} width={boardSize - 2 * padding} height={boardSize - 2 * padding} fill="white" />
          
          {Array.from({ length: 8 }, (_, row) => {
            return Array.from({ length: 8 }, (_, col) => {
              const pos: ChessPosition = String.fromCharCode(97 + col) + (8 - row) as ChessPosition;
              const pieceAtPos = board.pieces.find(p => p.position === pos);
              const validMoves: ChessPosition[] = [];
              
              for (const piece of board.pieces) {
                if (piece.position === selectedPos) {
                  validMoves.push(...piece.validMoves);
                }
              }
              let fill: string;
              
              
              if ((row + col) % 2 === 0) {
                fill = (selectedPos === pos ? SelectedColors['green'] : colors[0]);
              } else {
                fill = (selectedPos === pos ? SelectedColors['green'] : colors[1]);
              }
              let canReplace = false;
              if (selectedPos && board.pieces.find(p => p.position === selectedPos)?.replaceMoves.includes(pos)) {
                canReplace = true;
                //fill = SelectedColors['green'];
              }
              // if (pos == 'b5') {
              //   console.log("board.turn:", board.turn);
              //   console.log("board.pieces.find(p => p.position === selectedPos): ", board.pieces.find(p => p.position === selectedPos));
              //   console.log("board.pieces.find(p => p.position === selectedPos)?.replaceMoves.includes(pos): ", board.pieces.find(p => p.position === selectedPos)?.replaceMoves.includes(pos));
              //   console.log("canReplace at b5:", canReplace);
              //   console.log("selectedPos:", selectedPos);
              //   console.log("pieceAtPos at b5:", pieceAtPos);
              // }
              //console.log(`Rendering tile at ${pos} with fill ${fill}`);
              return (
              <>
                  { row == 0 ? <text key={`col-${col}`} x={padding + col * tileSize + tileSize / 2} y={row * tileSize + tileSize / 2}
                    textAnchor="middle" dominantBaseline="middle">
                    {isCapital ? String.fromCharCode(65 + col) : String.fromCharCode(97 + col)}
                  </text> : null}
                  { col == 0 ? <text key={`row-${row}`} x={col*tileSize+tileSize/2} y={padding + row * tileSize + tileSize / 2}
                    textAnchor="middle" dominantBaseline="middle">
                    {8 - row}
                  </text> : null}
                  <rect key={`${row}-${col}`} onClick={() => updatePiecePosition(String.fromCharCode(97 + col) + (8 - row) as ChessPosition)}
                  x={padding + col * tileSize} y={padding + row * tileSize} width={tileSize} height={tileSize} overflow={'visible'}
                    fill={canReplace ? SelectedColors['green'] : fill}/>
                  {validMoves && validMoves.includes(pos) && !pieceAtPos &&
                    <circle key={`circle-${row}-${col}`} cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                      r={10} fill={SelectedColors['green']} />}
                  {canReplace && pieceAtPos &&
                    <>
                    <defs>
                    <clipPath id={`clip`}>
                      <circle key={`circle-${row}-${col}`} cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                          r={42} fill={fill} />
                      </clipPath>
                    </defs>
                    <rect id={`rect-${row}-${col}`} key={`rect-container-${row}-${col}`}  x={padding + col * tileSize} y={padding + row * tileSize} width={tileSize} height={tileSize}
                      fill={fill} overflow={'visible'} clipPath={`url(#clip)`} />
                  {/* <use href={`#rect-${row}-${col}`} clipPath={`url(#clip)`} fill={fill} /> */}
                  </>
                  }
              </>
            );
          });
          })}

          {
            board.pieces.map((p, index) => {
              switch(p.type) {
                case "pawn":
                  return (!p.isCaptured && <Pawn key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "knight":
                  return (!p.isCaptured && <Knight key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "bishop":
                  return (!p.isCaptured && <Bishop key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "rook":
                  return (!p.isCaptured && <Rook key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "queen":
                  return (!p.isCaptured && <Queen key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
                case "king":
                  return (!p.isCaptured && <King key={index} color={p.color} position={p.position} onClick={onPieceClick} />);
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