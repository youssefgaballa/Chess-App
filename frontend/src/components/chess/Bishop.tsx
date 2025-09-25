import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Bishop = ({ color, position }: { color: ChessColor, position: ChessPosition }) => {
const bishop = new ChessPiece("bishop", color, position, 50, 600, 75);

  return (
    <svg x={bishop.boardPosition.x+7} y={bishop.boardPosition.y+9}
      width={bishop.tileSize} height={bishop.tileSize} style={{ overflow: 'visible' }}>
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