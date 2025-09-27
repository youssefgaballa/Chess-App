import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const King = ({ index, color, position, onClick }: { index: number, color: ChessColor, position: ChessPosition, onClick: (pos: ChessPosition, index: number) => void }) => {
  const king = new ChessPiece("king", color, position, 50, 600, 75);


  return (
    <svg x={king.boardPosition.x + 8} y={king.boardPosition.y+8}
      width={king.tileSize} height={king.tileSize} style={{ overflow: 'visible' }} onClick={() => onClick(position, index)}>
      {king.color === 'black' ? 
        <g style={{
          fill: 'none', fillOpacity: '1', fillRule: 'evenodd',
          stroke: '#000000', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round',
          strokeMiterlimit: '4', strokeDasharray: 'none', strokeOpacity: '1'
        }} transform={`scale(${king.tileSize / 40})`}>

          <path d={king.pathData[0]} style={{ fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' }} />
          <path d={king.pathData[1]} style={{fill: '#000000', fillOpacity: '1',
            strokeLinecap: 'butt', strokeLinejoin: 'miter'
          }} />
          <path d={king.pathData[2]} style={{ fill: '#000000', stroke: '#000000' }} />
          <path d={king.pathData[3]} style={{ fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' }} />
          <path d={king.pathData[4]} style={{ fill: 'none', stroke: '#ffffff' }} />
          <path d={king.pathData[5]} style={{ fill: 'none', stroke: '#ffffff' }} />
        </g>
        :
        <g style={{fill: 'none', fillRule: 'evenodd', stroke: '#000000', 
          strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.5'
        }} transform={`scale(${king.tileSize / 40})`}>
          <path d={king.pathData[0]} style={{ strokeLinejoin: 'miter' }} />
          <path d={king.pathData[1]} style={{ fill:'#ffffff', strokeLinecap: 'butt', strokeLinejoin: 'miter' }} />
          <path d={king.pathData[2]} style={{ fill: '#ffffff' }} />
          <path d={king.pathData[3]}/>
        </g>
    }
      
    </svg>
  );
}