import ChessPiece, { type ChessColor, type ChessPosition } from "./chessPiece";

export const Rook = ({ index, color, position, onClick }: { index: number, color: ChessColor, position: ChessPosition, onClick: (pos: ChessPosition, index: number) => void }) => {
const rook = new ChessPiece("rook", color, position, 50, 600, 75);

  return (
    <svg x={rook.boardPosition.x} y={rook.boardPosition.y}
      width={rook.tileSize} height={rook.tileSize} style={{ overflow: 'visible' }} onClick={() => onClick(position, index)}>
      <g style={{
        stroke: 'black', fill: `${rook.color}`, fillOpacity: '1', opacity: '1', fillRule: 'evenodd', strokeWidth: '1.5', strokeLinecap: 'round',
        strokeLinejoin: 'round', strokeMiterlimit: '4', strokeDasharray: 'none', strokeOpacity: '1'
      }} transform={`scale(${rook.tileSize / 35})`}>
        {rook.color === 'black' ?
          <>
            <path d={rook.pathData[0]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[1]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[2]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[3]} style={{ strokeLinecap: 'butt', strokeLinejoin: 'miter' }} />
            <path d={rook.pathData[4]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[5]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[6]} style={{
              fill: 'none', stroke: '#ffffff', strokeWidth: "1", strokeLinejoin: 'miter'
            }} />
            <path d={rook.pathData[7]} style={{
              fill: 'none', stroke: '#ffffff', strokeWidth: "1", strokeLinejoin: 'miter'
            }} />
            <path d={rook.pathData[8]} style={{
              fill: 'none', stroke: '#ffffff', strokeWidth: "1", strokeLinejoin: 'miter'
            }} />
            <path d={rook.pathData[9]} style={{
              fill: 'none', stroke: '#ffffff', strokeWidth: "1", strokeLinejoin: 'miter'
            }} />
            <path d={rook.pathData[10]} style={{
              fill: 'none', stroke: '#ffffff', strokeWidth: "1", strokeLinejoin: 'miter'
            }} />
          </>
          :
          <>
            <path d={rook.pathData[0]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[1]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[2]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[3]} />
            <path d={rook.pathData[4]} style={{ strokeLinecap: 'butt' }} />
            <path d={rook.pathData[5]} style={{ strokeLinecap: 'butt', strokeLinejoin:'miter' }} />
            <path d={rook.pathData[6]} />
            <path d={rook.pathData[7]} style={{ fill:'none',stroke:'#000000', strokeLinejoin: 'miter' }} />
          </>
          }

      </g>
    </svg>
  );
}