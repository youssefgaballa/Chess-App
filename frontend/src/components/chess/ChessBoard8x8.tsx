import {  Fragment, useEffect, useLayoutEffect, useState } from "react";
import {  type ChessColor, type ChessPieceType, type ChessPosition } from "./chessPiece";
import { Pawn } from "./Pawn";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";
import { useDispatch, useSelector } from "react-redux";
import { selectBoardState, setInitialBoard, movePiece, setValidMoves, isKingInCheck, setTurn, isKingCheckMated, setLastMove, promotePawn } from "./chessSlice";
import { SelectedColors } from "./ChessBoardSolo";
import socket from "../../util/socketManager";


const ChessBoard8x8: React.FC<{ colors: string[], side: ChessColor, roomID?: number }> = ({ colors, side, roomID }) => {
  const dispatch = useDispatch();
  const boardSize = 700; // 700px x 700px
  const tileSize = 75;
  const padding = 50;
  const isCapital = true; // Change to true if you want capital letters for columns
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const board = useSelector(selectBoardState);
  const resetGame = () => {
    //console.log("Game reset!");
    dispatch(setInitialBoard());
  }

  // useEffect(() => {
  //   console.log("selectedPieceIndex changed:", selectedPieceIndex);
  // }, [selectedPieceIndex]);
  const [pendingPromotion, setPendingPromotion] = useState<{ index: number, color: ChessColor } | null>(null);

  useEffect(() => {
    socket.on("piece moved", ({ fromIndex, toIndex, to }) => {
      console.log(`Received piece moved from ${fromIndex} to ${toIndex}`);
      const fromPiece = board.pieces[fromIndex];
      const toPiece = toIndex !== null ? board.pieces[toIndex] : null;
      if (toIndex >= 0 && toPiece !== null) {
        dispatch(movePiece({ from: fromPiece.position, fromIndex, to: toPiece?.position, toIndex, replace: true }));
      } else {
        dispatch(movePiece({ from: fromPiece.position, fromIndex, to: to, toIndex, replace: false }));
      }
      dispatch(setValidMoves({ pieceIndex: fromIndex }));

    });
    return () => {
      socket.off("piece moved");
    }
  }, []);

  const onSquareClick = (pos: ChessPosition, pieceIndex: number) => {
    // console.log("updatePiecePosition:", pos);
    // console.log("pieceIndex:", pieceIndex);
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
      if (roomID !== undefined) {
        socket.emit("move piece", { roomID, fromIndex: selectedPieceIndex, toIndex: pieceIndex, to: to});
      }
      setBoardState();

      if (pieceIndex >= 0) {
        dispatch(setLastMove({
          from: fromPiece.position, fromIndex: selectedPieceIndex,
          to: toPiece.position, toIndex: pieceIndex, replace: true
        }));
      } else {
        dispatch(setLastMove({
          from: fromPiece.position, fromIndex: selectedPieceIndex,
          to: to, toIndex: pieceIndex, replace: false
        }));
      }
      //console.log("board after move:", board);
    }
  }

  const onPieceClick = (pieceIndex: number) => {
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
      if (roomID !== undefined) {
        socket.emit("move piece", { roomID, from: fromPiece, to: toPiece });
      }
      setBoardState();
      dispatch(setLastMove({ from: fromPiece.position, fromIndex: selectedPieceIndex,
        to: toPiece.position, toIndex: pieceIndex, replace: true }) );
    }
    //console.log("board after move:", board);
  }

  useLayoutEffect(() => {
    //console.log("----First UseLayoutEffect:");
    // console.log("board:", board);
    //console.log("board.lastMove:", board.lastMove);
    if (board.lastMove == undefined) { // first move of the game
      return;
    }
    if (board.lastMoveFailed) {
      //console.log("Move failed, not changing turn.");
      return;
    }
    const yourKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
    const opponentKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);
    if (yourKing == undefined || opponentKing == undefined) {
      return;
    }
  
    //case for pawn promotionnn
    const lastMove = board.lastMove;
    const fromPiece = board.pieces[lastMove.toIndex];

    if (fromPiece && fromPiece.pendingPromotion) {  
      // Handle pawn promotion UI or logic here
      console.log("Pawn promotion needed for piece at:", fromPiece.position);
      setPendingPromotion({ index: lastMove.toIndex!, color: fromPiece.color });
      if (yourKing.isChecked && board.turn === (yourKing.color)) { // your king is in check and your move failed to get you out of check
        const lastMove = board.lastMove;
        dispatch(movePiece({ from: lastMove.to, fromIndex: lastMove.toIndex!, to: lastMove.from!, toIndex: lastMove.fromIndex!, replace: lastMove.replace!, undo: true }));
        dispatch(setValidMoves({ pieceIndex: lastMove.fromIndex! }));
        setBoardState();
      }
      return;
    }
    //normal cases
    if (!yourKing.isChecked && !opponentKing.isChecked) { // regular move with no checks
      dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));

    } else if ( opponentKing.isChecked && board.turn === (yourKing.color) && !yourKing.isChecked) { // checked opponent king without checking your own king
      dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }));
    } else if (yourKing.isChecked && board.turn === (yourKing.color)) { // your king is in check and your move failed to get you out of check
      const lastMove = board.lastMove;
      dispatch(movePiece({ from: lastMove.to, fromIndex: lastMove.toIndex!, to: lastMove.from!, toIndex: lastMove.fromIndex!, replace: lastMove.replace!, undo: true }));
      dispatch(setValidMoves({ pieceIndex: lastMove.fromIndex! }));
      setBoardState();
    }

  }, [board.lastMove]);

  const promotePiece = (type: Exclude<ChessPieceType, 'king' | 'pawn'>) => {
    if (pendingPromotion) {
      dispatch(promotePawn({ pieceIndex: pendingPromotion.index, newType: type }));
      setPendingPromotion(null);
      setBoardState();
      dispatch(setTurn({ color: board.turn === "white" ? "black" : "white" }) );
    }
  };

  const setBoardState = () => {
    for (let i = 0; i < board.pieces.length; i++) {
      const p = board.pieces[i];
      if (!p.isCaptured) {
        dispatch(setValidMoves({ pieceIndex: i }));
      }
    }
    const yourKing = board.pieces.find(p => p.type === 'king' && p.color === board.turn);
    const opponentKing = board.pieces.find(p => p.type === 'king' && p.color !== board.turn);
    // console.log("yourKing:", yourKing);
    // console.log("opponentKing:", opponentKing);
    if (yourKing && opponentKing) {
      dispatch(isKingInCheck({ pos: yourKing.position, color: yourKing.color }));
      dispatch(isKingInCheck({ pos: opponentKing.position, color: opponentKing.color }));
      dispatch(isKingCheckMated({ color: yourKing.color }));
      dispatch(isKingCheckMated({ color: opponentKing.color }));
    }
  };
  
  return (
    <>
      <div className="flex flex-row justify-center">
        {pendingPromotion && (
          <div className="mt-10">
            Promotion of pawn on {board.pieces[pendingPromotion.index].position}:<br />
            <button className="border border-black bg-white m-1 p-2 rounded-lg"
              onClick={() => promotePiece("queen")}>
              Promote to Queen
            </button>
            <button className="border border-black bg-white m-1 p-2 rounded-lg"
              onClick={() => promotePiece("rook")}>
              Promote to Rook
            </button>
            <button className="border border-black bg-white m-1 p-2 rounded-lg"
              onClick={() => promotePiece("bishop")}>
              Promote to Bishop
            </button>
            <button className="border border-black bg-white m-1 p-2 rounded-lg"
              onClick={() => promotePiece("knight")}>
              Promote to Knight
            </button>
          </div> 
        )}
        
      <div className='flex flex-col items-center mt-4'>
        <span>{!roomID && <>Play Solo Chess</>}</span>
        
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
              const freeMoves: ChessPosition[] = [];
              
              for (let i = 0; i < board.pieces.length; i++) {
                const piece = board.pieces[i];
                if (piece.position === selectedPiecePos && piece.isCaptured === false) {
                  freeMoves.push(...piece.freeMoves);
                }
              }
              // if (selectedPiecePos == 'd5')
              // console.log("selectedPiecePos:", selectedPiecePos);
              // console.log("freeMoves for selected piece:", freeMoves);
              let fill: string;
              
              
              if ((row + col) % 2 === 0) {
                fill = (selectedPiecePos === pos ? SelectedColors['green'] : colors[0]);
              } else {
                fill = (selectedPiecePos === pos ? SelectedColors['green'] : colors[1]);
              }
              
              let canReplace = false;
              // const couldReplace = board.pieces.find(p => {
              //   return p.position === selectedPiecePos && p.isCaptured === false;
              // });
              if (selectedPieceIndex && (selectedPieceIndex  > -1) && selectedPiece.replaceMoves.includes(pos) && pieceAtPos && pieceAtPos.color !== selectedPiece.color
                && pieceAtPos.isCaptured == false ) {
                canReplace = true;
              }
              if (selectedPiece && selectedPiece?.type === "king"  && selectedPiece.replaceMoves.includes(pos) && pieceAtPos
                && pieceAtPos.type === "rook" && pieceAtPos.color === selectedPiece.color && pieceAtPos.isCaptured == false) {
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
              let isTurn = true;
              if (selectedPiece && selectedPiece.color !== side && roomID !== undefined) {
                isTurn = false;
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
                  <rect data-testid={`sq-${pos}`} onClick={() => {  if (isTurn) onSquareClick(pos, pieceIndex)}}
                  x={padding + col * tileSize} y={padding + row * tileSize} width={tileSize} height={tileSize} overflow={'visible'}
                    fill={canReplace ? SelectedColors['green'] : fill} opacity={canReplace ? 0.8 : 1} />
                  {freeMoves && freeMoves.includes(pos) && (!pieceAtPos || pieceAtPos.isCaptured == true) &&
                    <circle  cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                      r={10} fill={SelectedColors['green']} opacity={0.8} onClick={() => { if (isTurn) onSquareClick(pos, pieceIndex)} } />
                  }
                  {canReplace && pieceAtPos && 
                    <>
                    <defs>
                    <clipPath id={`clip-${row}-${col}`}>
                      <circle cx={padding + col * tileSize + tileSize / 2} cy={padding + row * tileSize + tileSize / 2}
                          r={42} fill={fill} />
                      </clipPath>
                    </defs>
                    <rect id={`rect-${row}-${col}`} data-testid={`replace-${pos}`} x={padding + col * tileSize} y={padding + row * tileSize} width={tileSize} height={tileSize}
                      fill={fill} overflow={'visible'} clipPath={`url(#clip-${row}-${col})`} onClick={() => onSquareClick(pos, pieceIndex)}/>
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
        {roomID == undefined && <button onClick={resetGame} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Reset Board</button>}
        <div>Player turn: {board.turn}</div>
        <div>Last move: {board.lastMove ? `${board.lastMove.from} to ${board.lastMove.to}` : 'N/A'}</div>
        <div>{board.players['white'].isCheckmated ? 'White is checkmated!' : board.players['black'].isCheckmated ? 'Black is checkmated!' : ''}</div>

      </div>
      </div>
    </>
  )
}

export default ChessBoard8x8;