import  ChessBoard8x8  from "./ChessBoard8x8"

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
  'yellow': "#ffff00"
};

export const ChessBoardWrapper = () => {
  const colors = Colors['light/dark'];

  return (
    <>
      <div className='flex items-center justify-center mt-4'>
      <ChessBoard8x8 colors={colors} />
        <button className="m-[3%] p-[1%] w-[20%] border border-black rounded-lg hover:bg-red-500 hover:text-white">
          Create Room
        </button>
      </div>
    </>
  );

} 
