import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Bishop = ({ index, color, position, onClick, side }
  : { index: number, color: ChessColor, position: ChessPosition, onClick: (index: number) => void, side: ChessColor }) => {
  const bishop = new ChessPiece("bishop", color, position, side, 50, 600, 75);

  return (
    <svg id={`${index}`} data-testid={`${position}`} x={bishop.boardPosition.x+7} y={bishop.boardPosition.y+9}
      width={bishop.tileSize} height={bishop.tileSize} style={{ overflow: 'visible' }} onClick={() => onClick(index)}>
      <title>{`${bishop.color} bishop at ${position}`}</title>
      <g style={{ fill: `${bishop.color}`, stroke: '#000000', strokeLinecap: 'butt' }} transform={`scale(${bishop.tileSize / 40})`}>
        <path d={bishop.pathData[0]} />
        <path d={bishop.pathData[1]} />
        <path d={bishop.pathData[2]} />
      </g>
      <path d={bishop.pathData[3]} style={{
        fill: 'none', stroke: `${bishop.color === 'white' ? 'black' : 'white'}`, strokeLinejoin:'miter'
      }} transform={`scale(${bishop.tileSize / 40})`}/>
    </svg>
  );
}