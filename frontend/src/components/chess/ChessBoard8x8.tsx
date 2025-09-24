import { useLayoutEffect, useRef, useState } from "react";
import ChessPiece, { type ChessPosition } from "./chessPiece";


const ChessBoard8x8: React.FC<{ colors: string[] }> = ({ colors }) => {
  const chessboardRef = useRef<HTMLCanvasElement | null>(null);
  const boardSize = 700; // 700px x 700px
  const tileSize = 75;
  const padding = 50;
  const [pawnPositions, setPawnPositions] = useState<ChessPosition[]>(["a2"]);

  useLayoutEffect(() => {
    // create the chessboard
    const canvas = chessboardRef.current;
    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        ctx.font = "28px Helvetica";
        ctx.fillStyle = "black";
        
        const isCapital = true;
        // Draw the chessboard
        for (let row = 0; row < 8; row++) {

          for (let col = 0; col < 8; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? colors[0] : colors[1]; // Light and dark colors
            ctx.fillRect(padding + col * tileSize, padding + row * tileSize, tileSize, tileSize);
            //Draw top row and left column labels 

            if (row === 0 && isCapital) {
              ctx.fillText(String.fromCharCode(65 + col), padding + col * tileSize + 25, row * tileSize + 40);
            } else if (row === 0 && !isCapital) {
              ctx.fillText(String.fromCharCode(97 + col), padding + col * tileSize + 25, row * tileSize + 40);
            }
            if (col === 0) {
              ctx.fillText((8 - row).toString(), 20, padding + row * tileSize + 50);
            }

          }
        }


        //const pawn1a = new ChessPiece(ctx, "pawn", "black", pawnPositions[0], padding, boardSize, tileSize).draw();
        // const pawn1b = new ChessPiece("pawn", "white", "b2", ctx);
        // const pawn1c = new ChessPiece("pawn", "white", "c2", ctx);
        // const pawn1d = new ChessPiece("pawn", "white", "d2", ctx);
        // const pawn1e = new ChessPiece("pawn", "white", "e2", ctx);
        // const pawn1f = new ChessPiece("pawn", "white", "f2", ctx);
        // const pawn1g = new ChessPiece("pawn", "white", "g2", ctx);
        // const pawn1h = new ChessPiece("pawn", "white", "h2", ctx);
        // const rook1a = new ChessPiece("rook", "white", "a1", ctx);
        // const rook1h = new ChessPiece("rook", "white", "h1", ctx);
        // const knight1b = new ChessPiece("knight", "white", "b1", ctx);
        // const knight1g = new ChessPiece("knight", "white", "g1", ctx);
        // const bishop1c = new ChessPiece("bishop", "white", "c1", ctx);
        // const bishop1f = new ChessPiece("bishop", "white", "f1", ctx);
        // const queen1d = new ChessPiece("queen", "white", "d1", ctx);
        // const king1e = new ChessPiece("king", "white", "e1", ctx);


      }
    }
  }, [pawnPositions]);

  const startGame = () => {
    console.log("Game started!");
    // Here you can add logic to initialize the chess game
  }
  const movePiece = () => {
    console.log("Move piece!");
    setPawnPositions(["e2"]);
  }

  return (
    <>
      <div className='flex flex-col items-center mt-4'>
        <span>Chess Board</span>
        <canvas id="chessboard" width={`${boardSize}px`} height={`${boardSize}px`} className="border border-black p-[3%]" ref={chessboardRef}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <button onClick={startGame} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Start Game</button>
        <button onClick={movePiece} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Move Piece</button>
      </div>

    </>
  )
}

export default ChessBoard8x8;