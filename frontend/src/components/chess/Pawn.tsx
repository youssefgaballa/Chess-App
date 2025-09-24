import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Pawn = ({ color, position }: { color: ChessColor, position: ChessPosition }) => {
  const pawn = new ChessPiece("pawn", color, position, 50, 600, 75);

  return (
    <svg x={pawn.boardPosition.x} y={pawn.boardPosition.y}
      width={pawn.tileSize} height={pawn.tileSize} style={{ overflow: 'visible' }}>

      <path d={pawn.pathData[0]} fill={pawn.color}
        transform={`scale(${pawn.tileSize / 35})`} />
      <path d={pawn.pathData[0]} fill='none' stroke="black" strokeWidth='1%'
        transform={`scale(${pawn.tileSize / 35})`} />

    </svg>
  );
}