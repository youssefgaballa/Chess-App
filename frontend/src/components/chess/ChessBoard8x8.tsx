import {  useLayoutEffect, useState } from "react";
import { type ChessPosition } from "./chessPiece";
import { Pawn } from "./Pawn";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";
import { useDispatch, useSelector } from "react-redux";
import { selectBoardState, setInitialBoard, movePiece, setValidMoves, isKingInCheck, setTurn } from "./chessSlice";
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
        dispatch(setValidMoves({ piecePos: pos}));
        setSelectedPos(pos);
      }
      return;
    } else {
      const from = selectedPos;
      const to = pos;
      setSelectedPos(null);
      // Update piece positions
      const pieceAtPos = board.pieces.find(p => p.position === to);
      const yourKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
      const opponentKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);

      if (pieceAtPos) {
        dispatch(movePiece({ from, to, replace: true }));
      } else {
        dispatch(movePiece({ from, to, replace: false }));
      }

      for (const p of board.pieces) {
        //console.log("dispatching setValidMoves for:", p);
        dispatch(setValidMoves({ piecePos: p.position }));
      }

      if (yourKing && opponentKing) {
        dispatch(isKingInCheck({ pos: yourKing.position, color: yourKing.color }));
        
        dispatch(isKingInCheck({ pos: opponentKing.position, color: opponentKing.color }));

      }

    }
  }

  const onPieceClick = (pos: ChessPosition) => {
    //console.log("Piece clicked at position:", pos);

    //const pieceAtPos = board.pieces.find(p => p.position === pos);
    if (!selectedPos) {
      //if (!pieceAtPos) return; // should never occur since this listens to piece clicks
      dispatch(setValidMoves({ piecePos: pos }));
      setSelectedPos(pos);
    } else {
      const yourKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
      // console.log("Your king before move:", yourKing);
      const opponentKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);

      dispatch(movePiece({ from: selectedPos, to: pos, replace: true }));

      setSelectedPos(null);
      for (const p of board.pieces) {
        //console.log("dispatching setValidMoves for:", p);
        dispatch(setValidMoves({ piecePos: p.position}));
      }

      if (yourKing && opponentKing) {
        dispatch(isKingInCheck({ pos: yourKing.position, color: yourKing.color }));
        dispatch(isKingInCheck({ pos: opponentKing.position, color: opponentKing.color }));

      }


    }
  }


  useLayoutEffect(() => {
    //const opponentKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
    // console.log("Your king in useLayoutEffect:", yourKing);
    console.log("board.turn in useLayoutEffect:", board.turn);
    const yourKing= board.pieces.find(p => p.type === 'king' && p.color === board.turn);
    console.log("yourKing king in useLayoutEffect:", yourKing);
    console.log("yourKing.isChecked in useLayoutEffect:", yourKing?.isChecked);
    console.log("board.lastMove in useLayoutEffect:", board.lastMove);
    if (yourKing && !yourKing.isChecked && board.lastMove) {
      console.log("sucessfully unchecked your king in useLayoutEffect:", yourKing);
      console.log("board.turn in useLayoutEffect:", board.turn);
      dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));
    } else if (yourKing && yourKing.isChecked && board.isKingCheckedLastMove) {
      //dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));

      console.log("board.kingIsCheckedLastMove", board.isKingCheckedLastMove);
      console.log("Your king is still in check in useLayoutEffect:", yourKing);
      const fromPiece = board.pieces.find(p => p.position === board.lastMove?.to);
      const toPiece = board.pieces.find(p => p.position === board.lastMove?.from);
      console.log("fromPiece:", fromPiece);
      console.log("toPiece:", toPiece);

      const lastMove = board.lastMove;
      console.log("lastMove:", lastMove);
      dispatch(movePiece({ from: lastMove?.to!, to: lastMove?.from!, replace: lastMove?.replace!, undo: true }));
      
    }
  }, [board.lastMove]);


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
              }

              let isChecked = false;
              if (pieceAtPos?.type === "king" && pieceAtPos.isChecked) {
                isChecked = true;
              }
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
                    fill={canReplace ? SelectedColors['green'] : fill} opacity={canReplace ? 0.8 : 1} />
                  {validMoves && validMoves.includes(pos) && !pieceAtPos &&
                    <circle key={`circle-${row}-${col}`} cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                      r={10} fill={SelectedColors['green']} opacity={0.8} onClick={() => updatePiecePosition(String.fromCharCode(97 + col) + (8 - row) as ChessPosition)} />
                  }
                  {canReplace && pieceAtPos &&
                    <>
                    <defs>
                    <clipPath id={`clip-${row}-${col}`}>
                      <circle key={`circle-${row}-${col}`} cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                          r={42} fill={fill} />
                      </clipPath>
                    </defs>
                    <rect id={`rect-${row}-${col}`} key={`rect-container-${row}-${col}`}  x={padding + col * tileSize} y={padding + row * tileSize} width={tileSize} height={tileSize}
                      fill={fill} overflow={'visible'} clipPath={`url(#clip-${row}-${col})`} onClick={() => updatePiecePosition(String.fromCharCode(97 + col) + (8 - row) as ChessPosition)}/>
                    </>
                    
                  }
                  {
                    isChecked &&
                    <>
                      <defs>
                        <radialGradient id={`grad-${row}-${col}`} cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                          <stop offset="0%" style={{ stopColor: SelectedColors['red'], stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: SelectedColors['red'], stopOpacity: 0 }} />
                        </radialGradient>
                      </defs>
                      <circle key={`check-circle-${row}-${col}`} cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                        r={tileSize / 2} fill={`url(#grad-${row}-${col})`} />
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
          <div>{board.turn}</div>
      </div>

    </>
  )
}

export default ChessBoard8x8;