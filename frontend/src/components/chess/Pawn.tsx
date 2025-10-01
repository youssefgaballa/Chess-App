import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Pawn = ({ index, color, position, onClick }: { index: number, color: ChessColor, position: ChessPosition, onClick: (pos: ChessPosition, index: number) => void }) => {
  const pawn = new ChessPiece("pawn", color, position, 50, 600, 75);

  return (
    <svg data-testid={`${index}`} x={pawn.boardPosition.x} y={pawn.boardPosition.y}
      width={pawn.tileSize} height={pawn.tileSize} style={{ overflow: 'visible' }} onClick={() => onClick(position, index)}>
      <title>{`${pawn.color} pawn at ${position}`}</title>
      <path d={pawn.pathData[0]} fill={pawn.color}
        transform={`scale(${pawn.tileSize / 35})`} />
      <path d={pawn.pathData[0]} fill='none' stroke="black" strokeWidth='1%'
        transform={`scale(${pawn.tileSize / 35})`} />

    </svg>
  );
}