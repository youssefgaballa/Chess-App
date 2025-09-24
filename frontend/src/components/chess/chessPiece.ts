

export type ChessPieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn"
export type ChessPosition = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`
export type ChessColor = "white" | "black"

export default class ChessPiece {
  type: ChessPieceType;
  position: ChessPosition;
  effectivePosition: number[]; // position after accounting for board orientation
  boardPosition: { x: number, y: number }; // x and y coordinates on the board
  color: ChessColor;
  hasMoved: boolean;
  ctx: CanvasRenderingContext2D | null = null;
  padding: number;
  boardSize: number;
  tileSize: number;

  constructor(ctx: CanvasRenderingContext2D | null, type: ChessPieceType, color: ChessColor, position: ChessPosition,
    padding: number, boardSize: number, tileSize: number
  ) {
    this.type = type;
    this.color = color;
    this.position = position;
    this.effectivePosition = [position.charCodeAt(0) - 'a'.charCodeAt(0), parseInt(position[1]) - 1];
    //console.log("Effective Position: ", this.effectivePosition);
    this.hasMoved = false;
    this.ctx = ctx;
    this.padding = padding;
    this.boardSize = boardSize;
    this.tileSize = tileSize;
    this.boardPosition = { x: (this.effectivePosition[0]) * this.tileSize + this.padding, y: (7 - this.effectivePosition[1]) * this.tileSize + this.padding }
    return this;
  };



  draw() {
    if (this.ctx) {
      // Draw the chess piece on the canvas
      this.ctx.fillStyle = this.color === "white" ? "#FFFFFF" : "#000000";
      console.log(`Drawing ${this.color} ${this.type} at `, this.boardPosition);
      switch (this.type) {
        case "pawn": {
          // this.ctx.beginPath();
          // this.ctx.arc(this.boardPosition!.x + this.tileSize / 2, this.boardPosition!.y + this.tileSize / 2, this.tileSize / 4, 0, Math.PI * 2);
          // this.ctx.fill();
          const start = [this.boardPosition!.x + 10, this.boardPosition!.y + 20];
          console.log("start: ", start);

          // const p = new Path2D(`m ${start[0] + 22.5},${start[1] + 9} c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C ${start[0] + 17.33},${start[1] + 16.5}
          //   ${start[0] + 16},${start[1] + 18.59} ${start[0] + 16},${start[1] + 21} c 0,2.03 0.94,3.84 2.41,5.03 C ${start[0] + 15.41},${start[1] + 27.09} ${start[0] + 11},${start[1] + 31.58} 
          //   ${start[0] + 11},${start[1] + 39.5} H ${start[0] + 34} C ${start[0] + 34},${start[1] + 31.58}
          //   ${start[0] + 29.59},${start[1] + 27.09} ${start[0] + 26.59},${start[1] + 26.03} ${start[0] + 28.06},${start[1] + 24.84} 
          //   ${start[0] + 29},${start[1] + 23.03} ${start[0] + 29},${start[1] + 21} ${start[0] + 29},${start[1] + 18.59} 
          //   ${start[0] + 27.67},${start[1] + 16.5} ${start[0] + 25.72},${start[1] + 15.38} ${start[0] + 26.21},
          //   ${start[0] + 14.71} ${start[0] + 26.5},${start[1] + 13.89} ${start[0] + 26.5},${start[1] + 13} c 0,-2.21 -1.79,-4 -4,-4 z`);
          //this.ctx.clearRect(start[0], start[1], 45, 60);
          const p = new Path2D(`m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5
            16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58
            29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,
            14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z`);
          p.moveTo(start[0], start[1]);

          //this.ctx.translate(start[0], start[1]);
          //const p = new Path2D(`m ${start[0] + 22.5},${start[1] + 9} c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 `);

          this.ctx.fill(p);
          break;
        }

        // Add cases for other piece types (rook, knight, bishop, queen, king)
        default:
          break;
      }

    }
  }

  moveTo(newPosition: ChessPosition) {
    this.position = newPosition;
    this.effectivePosition = [newPosition.charCodeAt(0) - 'a'.charCodeAt(0), parseInt(newPosition[1]) - 1];
    console.log(this.effectivePosition);
    this.boardPosition = { x: (this.effectivePosition[0]) * this.tileSize + this.padding, y: (7 - this.effectivePosition[1]) * this.tileSize + this.padding }
    this.hasMoved = true;
    return this;
  }

}