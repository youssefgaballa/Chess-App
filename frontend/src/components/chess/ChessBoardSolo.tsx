import { useState } from "react";
import  ChessBoard8x8  from "./ChessBoard8x8"
import type { ChessColor } from "./chessPiece";

export const Colors = {
  'light/dark': ["#f0d9b5", "#b58863"],
  'blue/green': ["#a0c4ff", "#b5fbc0"],
  'red/black': ["#ffadad", "#9d0208"],
  'purple/yellow': ["#cdb4db", "#fdffb6"]
};

export const SelectedColors = {
  'green': "#7d9568",
  'red': "#ff0000",
  'blue': "#0000ff",
  'yellow': "#ffff00",
  'gray': "#808080"
};

export const ChessBoardSolo = () => {
  const colors = Colors['light/dark'];
  const [side, setSide] = useState<ChessColor>("white");
  const [gradient, setGradient] = useState<boolean>(false);

  return (
    <>
      <div className={`flex-col text-center items-center justify-center mt-4 ${gradient ? side == 'white' ? 'bg-gradient-to-b from-black to-white' : 'bg-gradient-to-b from-white to-black' : ''}`}>
      <ChessBoard8x8 colors={colors} side={side} />
        <button className="border border-black rounded-lg p-2"
          onClick={() => setSide(prevSide => prevSide === 'white' ? 'black' : 'white')}>Flip Board</button>
        <button className="border border-black rounded-lg p-2" onClick={() => setGradient(prev => !prev)}>Toggle Gradient</button>
      </div>
    </>
  );

} 
