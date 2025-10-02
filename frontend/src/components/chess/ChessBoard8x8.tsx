import {  Fragment, useEffect, useLayoutEffect, useState } from "react";
import {  type ChessColor, type ChessPosition } from "./chessPiece";
import { Pawn } from "./Pawn";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";
import { useDispatch, useSelector } from "react-redux";
import { selectBoardState, setInitialBoard, movePiece, setValidMoves, isKingInCheck, setTurn, isKingCheckMated } from "./chessSlice";
import { SelectedColors } from "./ChessBoardSolo";


const ChessBoard8x8: React.FC<{ colors: string[], side: ChessColor, roomID?: string }> = ({ colors, side, roomID }) => {
  const dispatch = useDispatch();
  const boardSize = 700; // 700px x 700px
  const tileSize = 75;
  const padding = 50;
  const isCapital = true; // Change to true if you want capital letters for columns
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const board = useSelector(selectBoardState);
  const [toggleKingInCheck, setToggleKingInCheck] = useState(false);
  const startGame = () => {
    //console.log("Game started!");

    dispatch(setInitialBoard());
  }

  useEffect(() => {
    console.log("selectedPieceIndex changed:", selectedPieceIndex);
  }, [selectedPieceIndex]);

  const updatePiecePosition = (pos: ChessPosition, pieceIndex: number) => {
    //console.log("updatePiecePosition:", pos);
    //console.log("pieceIndex:", pieceIndex);
    if (selectedPieceIndex == null) {
      if (pieceIndex !== -1) {
        dispatch(setValidMoves({ pieceIndex }));
      }
  
      setSelectedPieceIndex(pieceIndex);
    } else {
      //const to = board.pieces[pieceIndex].position;
      const to = pos;
      const fromPiece = board.pieces[selectedPieceIndex];
      const toPiece = board.pieces[pieceIndex];
      setSelectedPieceIndex(null);
      // Update piece positions
      //const pieceAtPos = board.pieces.find(p => p.position === to);
      if (fromPiece?.position === undefined) {
        return;
      }
      if (pieceIndex >= 0) {
        dispatch(movePiece({ from: fromPiece.position, fromIndex: selectedPieceIndex, to: toPiece.position, toIndex: pieceIndex, replace: true }));
      } else {
        dispatch(movePiece({ from: fromPiece.position, fromIndex: selectedPieceIndex, to: to, toIndex: pieceIndex, replace: false }));
      }
      dispatch(setValidMoves({ pieceIndex: selectedPieceIndex }));



    }
  }

  const onPieceClick = (pos: ChessPosition, pieceIndex: number) => {
    //console.log("Piece clicked at position:", pos);

    if (selectedPieceIndex == null) {
      dispatch(setValidMoves({pieceIndex }));
      setSelectedPieceIndex(pieceIndex);
    } else {
      const fromPiece = board.pieces[selectedPieceIndex];
      const toPiece = board.pieces[pieceIndex];
      if (fromPiece?.position === undefined) {
        return;
      }
      dispatch(movePiece({
        from: fromPiece.position, fromIndex: selectedPieceIndex,
        to: toPiece.position, toIndex: pieceIndex, replace: true
      }));
      dispatch(setValidMoves({ pieceIndex: selectedPieceIndex }));
      setSelectedPieceIndex(null);
    }
  }

  useLayoutEffect(() => {
    // console.log("----First UseLayoutEffect:");
    // console.log("board:", board);
    // console.log("board.lastMove:", board.lastMove);
    for (let i = 0; i < board.pieces.length; i++) {
      const p = board.pieces[i];
      // console.log("-------------Updating valid moves for piece at:", p.position);
      // console.log("p type:", p.type);
      if (!p.isCaptured) {
        dispatch(setValidMoves({pieceIndex: i }));
      }
    }
    const yourKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
    const opponentKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);
    // console.log("yourKing in first useLayoutEffect:", yourKing);
    if (yourKing && opponentKing) {
      dispatch(isKingInCheck({ pos: yourKing.position, color: yourKing.color }));
      dispatch(isKingInCheck({ pos: opponentKing.position, color: opponentKing.color }));
    }
    if (yourKing && yourKing.isChecked) {
      // console.log("Your king is in check in useLayoutEffect:", yourKing);
       //console.log("King is still in check:", board);
      // defer to next useLayoutEffect to handle
      setToggleKingInCheck(!toggleKingInCheck);
    } else if (board.lastMove) {
      dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));
      
    }
    if (yourKing && opponentKing) {
      dispatch(isKingCheckMated({ color: yourKing.color }));
      dispatch(isKingCheckMated({ color: opponentKing.color }));
    }
  }, [board.lastMove]);

  const yourKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
  const opponentKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);

  //console.log("yourKing outside useLayoutEffect:", yourKing);
  useLayoutEffect(() => {
    // console.log("----Second UseLayoutEffect:");
    // console.log("board:", board);
  //  const yourKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);
    if (yourKing && !yourKing.isChecked && board.lastMove) {
      // console.log("sucessfully unchecked your king in useLayoutEffect:", yourKing);
      // console.log("board.turn in useLayoutEffect:", board.turn);
      dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));
    } else if (yourKing && yourKing.isChecked && !(!opponentKing?.isChecked && opponentKing?.isKingCheckedLastMove)) {

      // console.log("board.kingIsCheckedLastMove", board.isKingCheckedLastMove);
      // console.log("Your king is still in check in useLayoutEffect:", yourKing);

      const lastMove = board.lastMove;
      // console.log("lastMove:", lastMove);
      if (lastMove) {
        dispatch(movePiece({ from: lastMove.to, fromIndex: lastMove.toIndex!, to: lastMove.from!, toIndex: lastMove.fromIndex!, replace: lastMove.replace, undo: true }));
      }
      // if (yourKing.color !== board.turn) {
      // dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));
      // }
      for (let i = 0; i < board.pieces.length; i++) {
        const p = board.pieces[i];
        // console.log("-------------Updating valid moves for piece at:", p.position);
        // console.log("p type:", p.type);
        if (!p.isCaptured) {
          dispatch(setValidMoves({ pieceIndex: i }));
        }
      }
      const opponentKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);
      if (yourKing && opponentKing) {
        dispatch(isKingInCheck({ pos: yourKing.position, color: yourKing.color }));
        dispatch(isKingInCheck({ pos: opponentKing.position, color: opponentKing.color }));
      }
      
    }
  }, [board.pieces.find(p => p.type === 'king' && p.color !== board.turn)?.isChecked]);
  
  useLayoutEffect(() => {
    // console.log("----Third UseLayoutEffect:");
    // console.log("board:", board);
    const yourKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
    // console.log("yourKing in third useLayoutEffect:", yourKing);


    if (yourKing && !yourKing.isChecked && board.lastMove) {
      // console.log("sucessfully unchecked your king in useLayoutEffect:", yourKing);
      // console.log("board.turn in useLayoutEffect:", board.turn);
      dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));
    } else if (yourKing && yourKing.isChecked) {

      // console.log("board.kingIsCheckedLastMove", board.isKingCheckedLastMove);
      //console.log("Your king is still in check in useLayoutEffect:", yourKing);

      const lastMove = board.lastMove;
      // console.log("lastMove:", lastMove);
      if (lastMove) {
        dispatch(movePiece({ from: lastMove.to, fromIndex: lastMove.toIndex!, to: lastMove.from!, toIndex: lastMove.fromIndex!, replace: lastMove.replace!, undo: true }));
      }
    }
  }, [toggleKingInCheck]);
  



  return (
    <>
      <div className='flex flex-col items-center mt-4'>
        <span>{roomID ? <>{roomID}</> : <>Play Solo Chess</>}</span>
        <svg width={`${boardSize}`} height={`${boardSize }`} className="border border-black">
          <rect x={padding} y={padding} width={boardSize - 2 * padding} height={boardSize - 2 * padding} fill="white" />
          
          {Array.from({ length: 8 }, (_, row) => {
            return Array.from({ length: 8 }, (_, col) => {
              const pos: ChessPosition = side == 'white' ? String.fromCharCode(97 + col) + (8 - row) as ChessPosition
                : String.fromCharCode(104 - col) + (1 + row) as ChessPosition;
              const pieceIndex = board.pieces.findIndex(p => {
                return p.position === pos && p.isCaptured === false;
              });
              const selectedPiecePos = selectedPieceIndex !== null ? board.pieces[selectedPieceIndex]?.position : null; 
              const selectedPiece = board.pieces[selectedPieceIndex!];
              const pieceAtPos = board.pieces.find(p => p.position === pos && p.isCaptured === false);
              const validMoves: ChessPosition[] = [];
              
              for (let i = 0; i < board.pieces.length; i++) {
                const piece = board.pieces[i];
                if (piece.position === selectedPiecePos && piece.isCaptured === false) {
                  validMoves.push(...piece.validMoves);
                }
              }
              // if (selectedPiecePos == 'd5')
              // console.log("selectedPiecePos:", selectedPiecePos);
              // console.log("validMoves for selected piece:", validMoves);
              let fill: string;
              
              
              if ((row + col) % 2 === 0) {
                fill = (selectedPiecePos === pos ? SelectedColors['green'] : side == 'white' ? colors[0] : colors[1]);
              } else {
                fill = (selectedPiecePos === pos ? SelectedColors['green'] : side == 'white' ? colors[1] : colors[0]);
              }
              
              let canReplace = false;
              // const couldReplace = board.pieces.find(p => {
              //   return p.position === selectedPiecePos && p.isCaptured === false;
              // });
              if (selectedPieceIndex && (selectedPieceIndex  > -1) && selectedPiece.replaceMoves.includes(pos) && pieceAtPos && pieceAtPos.color !== selectedPiece.color
                && pieceAtPos.isCaptured == false ) {
                canReplace = true;
              }
              // if (selectedPieceIndex && selectedPiece.type == ("pawn" as ChessPieceType) && couldReplace && couldReplace.replaceMoves.includes(pos) && pieceAtPos) {
              //   canReplace = true;
              // }

              let isChecked = false;
              if (pieceAtPos?.type === "king" && pieceAtPos.isChecked) {
                isChecked = true;
              }
              let isCheckmated = false;
              if (pieceAtPos?.type === "king" && board.players[pieceAtPos.color].isCheckmated) {
                //console.log("board.players[pieceAtPos.color].isCheckmated:", board.players[pieceAtPos.color].isCheckmated);
                isCheckmated = true;
              }

              return (
              <Fragment key={`${row}-${col}`}>
                  { row == 0 ? <text x={padding + col * tileSize + tileSize / 2} y={row * tileSize + tileSize / 2}
                    textAnchor="middle" dominantBaseline="middle">
                    {isCapital ? (side == 'white' ? String.fromCharCode(65 + col) : String.fromCharCode(72 - col))
                    : side == 'white' ? String.fromCharCode(97 + col) : String.fromCharCode(104 - col)}
                  </text> : null}
                  { col == 0 ? <text  x={col*tileSize+tileSize/2} y={padding + row * tileSize + tileSize / 2}
                    textAnchor="middle" dominantBaseline="middle">
                    {side == 'white' ? 8 - row : 1 + row}
                  </text> : null}
                  <rect data-testid={`sq-${pos}`} onClick={() => updatePiecePosition(pos, pieceIndex)}
                  x={padding + col * tileSize} y={padding + row * tileSize} width={tileSize} height={tileSize} overflow={'visible'}
                    fill={canReplace ? SelectedColors['green'] : fill} opacity={canReplace ? 0.8 : 1} />
                  {validMoves && validMoves.includes(pos) && (!pieceAtPos || pieceAtPos.isCaptured == true) &&
                    <circle  cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                      r={10} fill={SelectedColors['green']} opacity={0.8} onClick={() => updatePiecePosition(pos, pieceIndex)} />
                  }
                  {canReplace && pieceAtPos &&
                    <>
                    <defs>
                    <clipPath id={`clip-${row}-${col}`}>
                      <circle cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                          r={42} fill={fill} />
                      </clipPath>
                    </defs>
                    <rect id={`rect-${row}-${col}`}   x={padding + col * tileSize} y={padding + row * tileSize} width={tileSize} height={tileSize}
                      fill={fill} overflow={'visible'} clipPath={`url(#clip-${row}-${col})`} onClick={() => updatePiecePosition(pos, pieceIndex)}/>
                    </>
                    
                  }
                  {
                    isChecked && !isCheckmated  &&
                    <>
                      <defs>
                        <radialGradient id={`grad-${row}-${col}`} cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                          <stop offset="0%" style={{ stopColor: SelectedColors['red'], stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: SelectedColors['red'], stopOpacity: 0 }} />
                        </radialGradient>
                      </defs>
                      <circle data-testid={`check-indicator`} id={`${pos}`} cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                        r={tileSize / 2} fill={`url(#grad-${row}-${col})`} />
                    </>
                  }
                  {
                    isCheckmated &&
                    <>
                      <defs>
                        <radialGradient id={`grad-${row}-${col}`} cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                          <stop offset="0%" style={{ stopColor: SelectedColors['gray'], stopOpacity: 0.8 }} />
                          <stop offset="100%" style={{ stopColor: SelectedColors['gray'], stopOpacity: 0 }} />
                        </radialGradient>
                      </defs>
                      <circle data-testid={`checkmate-indicator`} id={`${pos}`} cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                        r={tileSize / 2} fill={`url(#grad-${row}-${col})`} />
                    </>
                  }

              </Fragment>
            );
          });
          })}

          {
            board.pieces.map((p, index) => {
              switch(p.type) {
                case "pawn":
                  return (!p.isCaptured && <Pawn key={index} index={index} color={p.color} position={p.position} onClick={onPieceClick} side={side}/>);
                case "knight":
                  return (!p.isCaptured && <Knight key={index} index={index} color={p.color} position={p.position} onClick={onPieceClick} side={side}/>);
                case "bishop":
                  return (!p.isCaptured && <Bishop key={index} index={index} color={p.color} position={p.position} onClick={onPieceClick} side={side}/>);
                case "rook":
                  return (!p.isCaptured && <Rook key={index} index={index} color={p.color} position={p.position} onClick={onPieceClick} side={side}/>);
                case "queen":
                  return (!p.isCaptured && <Queen key={index} index={index} color={p.color} position={p.position} onClick={onPieceClick} side={side}/>);
                case "king":
                  return (!p.isCaptured && <King key={index} index={index} color={p.color} position={p.position} onClick={onPieceClick} side={side}/>);
                  default:
                    return null;
              }
            })
          }
          
      </svg>
      <button onClick={startGame} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start Game</button>
        <div>Player turn: {board.turn}</div>
        <div>Last move: {board.lastMove ? `${board.lastMove.from} to ${board.lastMove.to}` : 'N/A'}</div>
        <div>{board.players['white'].isCheckmated ? 'White is checkmated!' : board.players['black'].isCheckmated ? 'Black is checkmated!' : ''}</div>

      </div>

    </>
  )
}

export default ChessBoard8x8;