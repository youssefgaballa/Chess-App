import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Knight = ({ index, color, position, onClick }: { index: number, color: ChessColor, position: ChessPosition, onClick: (pos: ChessPosition, index: number) => void }) => {
const knight = new ChessPiece("knight", color, position, 50, 600, 75);

  return (
    <svg x={knight.boardPosition.x+5} y={knight.boardPosition.y+7}
      width={knight.tileSize} height={knight.tileSize} style={{ overflow: 'visible' }} onClick={() => onClick(position, index)}>
      <g style={{
        stroke: 'black', fill: 'none', fillOpacity: '1', fillRule: 'evenodd', strokeWidth: '1.5', strokeLinecap: 'round',
        strokeLinejoin: 'round', strokeMiterlimit: '4', strokeDasharray: 'none', strokeOpacity: '1'
      }} transform={`scale(${knight.tileSize / 38})`}>
        <path d={knight.pathData[0]} fill={knight.color} style={{ fill: `${knight.color}`, stroke: '#000000' }} />
        <path d={knight.pathData[1]} fill={knight.color} style={{ fill: `${knight.color}`, stroke: '#000000' }} />
        <path d={knight.pathData[2]} fill='white'
          style={{ fill: `${knight.color === 'white' ? 'black' : 'white'}`, stroke: `${knight.color === 'white' ? 'black' : 'white'}` }} />
        <path d={knight.pathData[3]} fill='white'
          style={{
            fill: `${knight.color === 'white' ? 'black' : 'white'}`, stroke: `${knight.color === 'white' ? 'black' : 'white'}`,
            transform: 'matrix(0.866, 0.5, -0.5, 0.866, 9.693, -5.173)'}} />
        {knight.color === 'black' && <path d={knight.pathData[4]} fill='white' style={{ fill: 'white', stroke: 'none' }} />}

      </g>

    </svg>
  );
}