import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Queen = ({ color, position }: { color: ChessColor, position: ChessPosition }) => {
  const queen = new ChessPiece("queen", color, position, 50, 600, 75);


  return (
    <svg x={queen.boardPosition.x + 8} y={queen.boardPosition.y+8}
      width={queen.tileSize} height={queen.tileSize} style={{ overflow: 'visible' }}>
      <g style={{ fill: `${queen.color}`, stroke: '#000000', strokeWidth: '1.5', strokeLinejoin: 'round', ...(queen.color === 'black' && { strokeLinecap: 'round' }) }}
        transform={`scale(${queen.tileSize / 40})`}>
        {queen.color === 'black' ?
          <>
        <path d={queen.pathData[0]} style={{ strokeLinecap: 'butt', fill: '#000000' }} />
        <path d={queen.pathData[1]} />
        <path d={queen.pathData[2]} />
        <path d={queen.pathData[3]} />
        <circle cx="6" cy="12" r="2" />
        <circle cx="14" cy="9" r="2" />
        <circle cx="22.5" cy="8" r="2" />
        <circle cx="31" cy="9" r="2" />
        <circle cx="39" cy="12" r="2" />
        <path d={queen.pathData[4]} style={{
          strokeLinecap: 'butt', fill: 'none', stroke:'#000000'
            }} />
          </>
          :
          <>
            <path d={queen.pathData[0]}/>
            <path d={queen.pathData[1]} />
            <path d={queen.pathData[2]} style={{ fill:'none'}}/>
            <path d={queen.pathData[3]} style={{ fill: 'none' }} />
            <circle cx="6" cy="12" r="2" />
            <circle cx="14" cy="9" r="2" />
            <circle cx="22.5" cy="8" r="2" />
            <circle cx="31" cy="9" r="2" />
            <circle cx="39" cy="12" r="2" />
          </>
        }
      </g>
      {queen.color == 'black' && <g style={{ fill: 'none', stroke: '#ffffff'}} transform={`scale(${queen.tileSize / 40})`}>
        <path d={queen.pathData[5]} />
        <path d={queen.pathData[6]} />
        <path d={queen.pathData[7]} />
        <path d={queen.pathData[8]} />
      </g>}
    </svg>
  );
}