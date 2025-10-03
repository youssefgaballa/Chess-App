import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Pawn = ({ index, color, position, onClick, side }
  : { index: number, color: ChessColor, position: ChessPosition, onClick: (index: number) => void, side: ChessColor }) => {
  const pawn = new ChessPiece("pawn", color, position, side, 50, 600, 75);

  return (
    <svg id={`${index}`} data-testid={`${position}`} x={pawn.boardPosition.x} y={pawn.boardPosition.y}
      width={pawn.tileSize} height={pawn.tileSize} style={{ overflow: 'visible' }} onClick={() => onClick(index)}>
      <title>{`${pawn.color} pawn at ${position}`}</title>
      <path d={pawn.pathData[0]} fill={pawn.color}
        transform={`scale(${pawn.tileSize / 35})`} />
      <path d={pawn.pathData[0]} fill='none' stroke="black" strokeWidth='1%'
        transform={`scale(${pawn.tileSize / 35})`} />

    </svg>
  );
}