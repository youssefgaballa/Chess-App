import { beforeEach, describe, expect, it} from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { afterEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit';
import chessBoardReducer from './chessSlice';
import userReducer from '../../users/userSlice';
import ChessBoard8x8 from './ChessBoard8x8';
import {Colors} from './ChessBoardSolo'
import type { ChessColor, ChessPosition } from './chessPiece';


  describe('White Board Solo Tests', () => {
    beforeEach(async () => {
      const store = configureStore({
        reducer: {
          userDetails: userReducer,
          chessBoard: chessBoardReducer,
        },
      });

      await render(
        <Provider store={store}>
          <ChessBoard8x8 colors={Colors['light/dark']} side={'white'} />
        </Provider>);
    });

    afterEach(async () => {
      await cleanup();
    });

    BoardTests('white');

  });

describe('Black Board Solo Tests', () => {
  beforeEach(async () => {
    const store = configureStore({
      reducer: {
        userDetails: userReducer,
        chessBoard: chessBoardReducer,
      },
    });

    await render(
      <Provider store={store}>
        <ChessBoard8x8 colors={Colors['light/dark']} side={'black'} />
      </Provider>);
  });

  afterEach(async () => {
    await cleanup();
  });

  BoardTests('black');

});


const BoardTests = (side: ChessColor) => {
  it('renders every piece in the correct initial position', async () => {

    // Check if all pieces are rendered in their initial positions
    for (let i = 0; i < 32; i++) {
      let piece;
      if (i >= 0 && i < 7) {
        piece = screen.getByTestId(`${String.fromCharCode('a'.charCodeAt(0) + i)}2`); // White pawns
      } else if (i >= 8 && i < 16) {
        piece = screen.getByTestId(`${String.fromCharCode('a'.charCodeAt(0) + (i - 8))}1`); // White back rank
      } else if (i >= 16 && i < 24) {
        piece = screen.getByTestId(`${String.fromCharCode('a'.charCodeAt(0) + (i - 16))}7`); // Black pawns
      } else if (i >= 24 && i < 32) {
        piece = screen.getByTestId(`${String.fromCharCode('a'.charCodeAt(0) + (i - 24))}8`); // Black back rank
      } else {
        piece = null;
      }
      if (!piece) continue; //
      //console.log(piece);
      expect(piece).toBeInTheDocument();
      expect(piece).toHaveAttribute('width', '75');
      expect(piece).toHaveAttribute('height', '75');
      const type = piece.querySelector('title')?.textContent.split(' ')[1];
      expect(type).toBeDefined();
      const position = piece.querySelector('title')?.textContent.split(' ')[3];
      expect(position).toBeDefined();
      const row = parseInt(position![1]);
      const col = position![0];
      switch (type) {
        case 'pawn': {
          if (i < 8) {
            // White pawns
            expect(row).toBe(2);
            expect(col).toBe(String.fromCharCode('a'.charCodeAt(0) + (i % 8)));
          } else if (i >= 16 && i < 24) {
            // Black pawns
            expect(row).toBe(7);
            expect(col).toBe(String.fromCharCode('a'.charCodeAt(0) + (i % 8)));
          }
          break;
        }
        case 'rook': {
          if (i === 8 || i === 15) {
            // White rooks
            expect(row).toBe(1);
            expect(col).toBe(i === 8 ? 'a' : 'h');
          } else if (i === 24 || i === 31) {
            // Black rooks
            expect(row).toBe(8);
            expect(col).toBe(i === 24 ? 'a' : 'h');
          }
          break;
        }
        case 'knight': {
          if (i === 9 || i === 14) {
            // White knights
            expect(row).toBe(1);
            expect(col).toBe(i === 9 ? 'b' : 'g');
          } else if (i === 25 || i === 30) {
            // Black knights
            expect(row).toBe(8);
            expect(col).toBe(i === 25 ? 'b' : 'g');
          }
          break;
        }
        case 'bishop': {
          if (i === 10 || i === 13) {
            // White bishops
            expect(row).toBe(1);
            expect(col).toBe(i === 10 ? 'c' : 'f');
          } else if (i === 26 || i === 29) {
            // Black bishops
            expect(row).toBe(8);
            expect(col).toBe(i === 26 ? 'c' : 'f');
          }
          break;
        }
        case 'queen': {
          if (i === 11) {
            // White queen
            expect(row).toBe(1);
            expect(col).toBe('d');
          } else if (i === 27) {
            // Black queen
            expect(row).toBe(8);
            expect(col).toBe('d');
          }
          break;
        }
        case 'king': {
          if (i === 12) {
            // White king
            expect(row).toBe(1);
            expect(col).toBe('e');
          } else if (i === 28) {
            // Black king
            expect(row).toBe(8);
            expect(col).toBe('e');
          }
          break;
        }
        default:
          throw new Error(`Unknown piece type: ${type}`);
      }

    }

  });

  it("king should be able to replace piece that checks it", async () => {
    if (side == 'white') {
      await movePiece('d2', 'd4');
      await movePiece('e7', 'e5');
      await movePiece('d4', 'e5');
      await movePiece('d7', 'd5');
      await movePiece('d1', 'd5');
      await movePiece('a7', 'a6');
      await movePiece('d5', 'd8'); // put black in check

      await movePiece('e8', 'd8'); // black king takes queen to get out of check

    } else if (side == 'black') {
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('e4', 'd5');
      await movePiece('d8', 'd5');
      await movePiece('d2', 'd4');
      await movePiece('d5', 'd4');
      await movePiece('a2', 'a3');
      await movePiece('d4', 'd1'); // put white in check
      await movePiece('e1', 'd1'); // white king takes queen to get out of check
    }
  });

  it("king should be able to move to a free spot when in check", async () => {
    if (side == 'white') {
      await movePiece('g1', 'h3');
      await movePiece('e7', 'e6');
      await movePiece('h3', 'f4');
      await movePiece('e6', 'e5');
      await movePiece('f4', 'h5');
      await movePiece('e5', 'e4');
      await movePiece('h5', 'f6'); // put black in check
      await movePiece('e8', 'e7'); // black king moves out of check
    } else if (side == 'black') {
      await movePiece('e2', 'e3');
      await movePiece('g8', 'h6');
      await movePiece('e3', 'e4');
      await movePiece('h6', 'f5');
      await movePiece('e4', 'e5');
      await movePiece('f5', 'h4');
      await movePiece('e5', 'e6');
      await movePiece('h4', 'f3'); // put white in check
      await movePiece('e1', 'e2'); // white king moves out of check
    }
  });



  it("Kingside castle", async () => {
    if (side == 'white') {
      await movePiece('g2', 'g4');
      await movePiece('a7', 'a6');
      await movePiece('f1', 'h3');
      await movePiece('a6', 'a5');
      await movePiece('g1', 'f3');
      await movePiece('a5', 'a4');
      //screen.logTestingPlaygroundURL()
      // make sure replace indicator for rook appears when king is clicked
      const kingSquare = screen.getByTestId(`sq-e1`); 
      await userEvent.click(kingSquare);
      const replaceRookIndicator = screen.getByTestId(`replace-h1`);
      expect(replaceRookIndicator).toBeInTheDocument();
      await userEvent.click(kingSquare); // unselect the king so movePiece works correctly
      await movePiece('e1', 'h1', undefined, true); //castle move
      //screen.logTestingPlaygroundURL()
    } else if (side == 'black') {
      await movePiece('a2', 'a3');
      await movePiece('g7', 'g5');
      await movePiece('a3', 'a4');
      await movePiece('f8', 'h6');
      await movePiece('a4', 'a5');
      await movePiece('g8', 'f6');
      await movePiece('a5', 'a6');
      const kingSquare = screen.getByTestId(`sq-e8`);
      await userEvent.click(kingSquare);
      const replaceRookIndicator = screen.getByTestId(`replace-h8`);
      expect(replaceRookIndicator).toBeInTheDocument();
      await userEvent.click(kingSquare); // unselect the king so movePiece works correctly
      await movePiece('e8', 'h8', undefined, true); //castle move
    }
  });
  it("Queenside castle", async () => {
    if (side == 'white') {
      await movePiece('d2', 'd4');
      await movePiece('h7', 'h6');
      await movePiece('c1', 'e3');
      await movePiece('h6', 'h5');
      await movePiece('b1', 'a3');
      await movePiece('h5', 'h4');
      await movePiece('d1', 'd3');
      await movePiece('h4', 'h3');
      
      //screen.logTestingPlaygroundURL()
      // make sure replace indicator for rook appears when king is clicked
      const kingSquare = screen.getByTestId(`sq-e1`);
      await userEvent.click(kingSquare);
      const replaceRookIndicator = screen.getByTestId(`replace-a1`);
      expect(replaceRookIndicator).toBeInTheDocument();
      await userEvent.click(kingSquare); // unselect the king so movePiece works correctly
      await movePiece('e1', 'a1', undefined, true); //castle move
    } else if (side == 'black') {
      await movePiece('h2', 'h3');
      await movePiece('d7', 'd5');
      await movePiece('h1', 'h2');
      await movePiece('c8', 'h3');
      await movePiece('g2', 'h3');
      await movePiece('d8', 'd6');
      await movePiece('h3', 'h4');
      await movePiece('b8', 'c6');
      await movePiece('h4', 'h5');//ready to castle

      const kingSquare = screen.getByTestId(`sq-e8`);
      await userEvent.click(kingSquare);
      const replaceRookIndicator = screen.getByTestId(`replace-a8`);
      expect(replaceRookIndicator).toBeInTheDocument();
      await userEvent.click(kingSquare); // unselect the king so movePiece works correctly

      await movePiece('e8', 'a8', undefined, true); //castle move

    }
  });


  it('moves a piece when clicked on a valid square and can take pieces', async () => {
    if (side == 'white') {
      const squareE4 = screen.getByTestId('sq-e4');
      expect(squareE4).toBeInTheDocument();
      const e2 = screen.getByTestId('e2'); // White pawns
      expect(e2).toBeInTheDocument();
      //console.log("e2.dataset.testid:", e2.dataset.testid);
      expect(e2.dataset.testid).toBe('e2');
      await movePiece('e2', 'e4');
      expect(e2.dataset.testid).toBe('e4');
      const d7 = screen.getByTestId('d7'); // Black pawns
      await movePiece('d7', 'd5');
      await movePiece('e4', 'd5'); //white takes black pawn
      expect(d7).not.toBeInTheDocument();
      expect(e2.dataset.testid).toBe('d5');
      //console.log("e2.dataset.testid:", e2.dataset.testid);
      //screen.logTestingPlaygroundURL()
    } else if (side == 'black') {
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('d2', 'd3');
      await movePiece('d5', 'e4'); //black takes white pawn

    }

  });

  it("Renders the check indicator when in check", async () => {
    if (side == 'white') {
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('f1', 'b5');
      //screen.logTestingPlaygroundURL()
      const checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e8');
      
    } else if (side == 'black') {
      await movePiece('d2', 'd4');
      await movePiece('e7', 'e5');
      await movePiece('g1', 'f3');
      await movePiece('f8', 'b4'); //black puts white in check
      const checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e1');
      //screen.logTestingPlaygroundURL();
    }

  });

  it("Undo move that doesnt block check and checks can be blocked", async () => {
    if (side == 'white') {
      //console.log("white tests");
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('f1', 'b5');
      const e7 = screen.getByTestId('e7');
      await movePiece('e7', 'e6', true);
      await movePiece('d5', 'e4', true);
      const checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e8');
      expect(e7.dataset.testid).toBe('e7');
      await movePiece('c7', 'c6');
      expect(checkIndicator).not.toBeInTheDocument();
    } else if (side == 'black') {
      console.log("black tests");
      await movePiece('d2', 'd4');
      await movePiece('e7', 'e5');
      await movePiece('g1', 'f3');
      await movePiece('f8', 'b4'); //black puts white in check
      await movePiece('b2', 'b3', true);
      await movePiece('d4', 'e5', true);
      const checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e1');
      await movePiece('f3', 'd2');
      //screen.logTestingPlaygroundURL();
      expect(checkIndicator).not.toBeInTheDocument();
    }
  });

  it("Undo moves that puts you in check", async () => {
    if (side == 'white') {
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('f1', 'b5'); // white puts black in check
      await movePiece('d8', 'd7');
      await movePiece('h2', 'h3');
      const d7 = screen.getByTestId('d7');
      await movePiece('d7', 'e6', true);
      const checkIndicator = screen.queryByTestId('check-indicator');
      expect(checkIndicator).not.toBeInTheDocument();
      expect(d7.dataset.testid).toBe('d7');
    } else if (side == 'black') {
      await movePiece('d2', 'd4');
      await movePiece('e7', 'e5');
      await movePiece('g1', 'f3');
      await movePiece('f8', 'b4'); //black puts white in check
     
      await movePiece('d1', 'd2');
      await movePiece('e5', 'd4');
      await movePiece('d2', 'e3', true); // attempt to move pinned queen
      //screen.logTestingPlaygroundURL();
      const checkIndicator = screen.queryByTestId('check-indicator');
      expect(checkIndicator).not.toBeInTheDocument();
    }
  });

  it("Checked with discovered attack", async () => {
    if (side == 'white') {
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('d2', 'd4');
      await movePiece('e7', 'e5');
      await movePiece('d1', 'e2');
      await movePiece('e5', 'd4');
      await movePiece('e4', 'd5');
      const checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e8');
      //screen.logTestingPlaygroundURL()
    } else if (side == 'black') {
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('d2', 'd4');
      await movePiece('e7', 'e5');
      await movePiece('c1', 'g5');
      await movePiece('d8', 'e7'); //move queen in position
      await movePiece('e4', 'd5');
      await movePiece('e5', 'd4'); // discovered check
      const checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e1');
    }
  });

  it("Player in check moves piece to block check whilst checking other king", async () => {
    if (side == 'white') {
      await movePiece('e2', 'e4');
      await movePiece('d7', 'd5');
      await movePiece('e1', 'e2');
      await movePiece('h7', 'h6');
      await movePiece('e2', 'd3');
      await movePiece('h6', 'h5');
      await movePiece('d3', 'd4');
      await movePiece('h5', 'h4');
      await movePiece('f1', 'b5'); // puts black in check
      let checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e8');
      //screen.logTestingPlaygroundURL()
      await movePiece('b8', 'c6'); // counter checks white
      // screen.logTestingPlaygroundURL()
      checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toHaveAttribute('id', 'd4');
    } else if (side == 'black') {
      await movePiece('d2', 'd4');
      await movePiece('e7', 'e5');
      await movePiece('h2', 'h3');
      await movePiece('e8', 'e7');
      await movePiece('h3', 'h4');
      await movePiece('e7', 'd6');
      await movePiece('h4', 'h5');
      await movePiece('d6', 'd5');
      await movePiece('h5', 'h6');
      await movePiece('f8', 'b4'); // puts white in check
      let checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toBeInTheDocument();
      expect(checkIndicator).toHaveAttribute('id', 'e1');
      await movePiece('b1', 'c3'); // counter checks black
      checkIndicator = screen.getByTestId('check-indicator');
      expect(checkIndicator).toHaveAttribute('id', 'd5');
    }
  });
  it("4 move Checkmate with queen and bishop", async () => {
    if (side == 'white') {
      await movePiece('e2', 'e4');
      await movePiece('e7', 'e5');
      await movePiece('f1', 'c4');
      await movePiece('a7', 'a6');
      await movePiece('d1', 'h5');
      await movePiece('a6', 'a5');
      await movePiece('h5', 'f7'); // checkmate
      const checkIndicator = screen.queryByTestId('check-indicator');
      expect(checkIndicator).not.toBeInTheDocument();
      let checkmateIndicator = screen.getByTestId('checkmate-indicator');
      expect(checkmateIndicator).toBeInTheDocument();
      expect(checkmateIndicator).toHaveAttribute('id', 'e8');
      await movePiece('e8', 'e7', true);
      await movePiece('h7', 'h6', true);
      checkmateIndicator = screen.getByTestId('checkmate-indicator');
      expect(checkmateIndicator).toBeInTheDocument();
      expect(checkmateIndicator).toHaveAttribute('id', 'e8');
      //screen.logTestingPlaygroundURL()
    } else if (side == 'black') {
      await movePiece('e2', 'e4');
      await movePiece('e7', 'e5');
      await movePiece('h2', 'h3');
      await movePiece('f8', 'c5');
      await movePiece('h3', 'h4');
      await movePiece('d8', 'h4');
      await movePiece('b2', 'b4');
      await movePiece('h4', 'f2'); // checkmate
      const checkIndicator = screen.queryByTestId('check-indicator');
      expect(checkIndicator).not.toBeInTheDocument();
      let checkmateIndicator = screen.getByTestId('checkmate-indicator');
      expect(checkmateIndicator).toBeInTheDocument();
      expect(checkmateIndicator).toHaveAttribute('id', 'e1');
      await movePiece('e1', 'e2', true);
      await movePiece('d2', 'd3', true);
      checkmateIndicator = screen.getByTestId('checkmate-indicator');
      expect(checkmateIndicator).toBeInTheDocument();
      expect(checkmateIndicator).toHaveAttribute('id', 'e1');
    }
  });
};

const movePiece = async (from: string, to: string, expectUndo?: boolean, isCastling?: boolean) => {
  const fromSquare = screen.getByTestId(`sq-${from}`);
  const fromPiece = screen.getByTestId(from);
  expect(fromSquare).toBeInTheDocument();
  expect(fromPiece.dataset.testid).toBe(from);
  const toSquare = screen.getByTestId(`sq-${to}`);
  expect(toSquare).toBeInTheDocument();
  await userEvent.click(fromSquare);
  await userEvent.click(toSquare);
  // expect(fromSquare).toBeInTheDocument();
  // expect(toSquare).toBeInTheDocument();
  if (isCastling) {
    let newKingPos: ChessPosition;
    let newRookPos: ChessPosition;
    if (to[0] === 'h' && to[1] === '1') { //White Kingside castle
      newKingPos = 'g1';
      newRookPos = 'f1';
    } else if (to[0] === 'a' && to[1] === '1') { //White Queenside castle
      newKingPos = 'c1';
      newRookPos = 'd1';
    } else if (to[0] === 'h' && to[1] === '8') { //Black Kingside castle
      newKingPos = 'g8';
      newRookPos = 'f8';
    } else if (to[0] === 'a' && to[1] === '8') { //Black Queenside castle
      newKingPos = 'c8';
      newRookPos = 'd8';
    } else {
      throw new Error("Invalid castle move");
    }
    expect(fromPiece.dataset.testid).toBe(newKingPos); //king should not have moved
    const rook = screen.getByTestId(newRookPos);
    expect(rook).toBeInTheDocument();
    return;
  }
  if (expectUndo == undefined || expectUndo === false) {
    //console.log("expectUndo is false");
    expect(fromPiece.dataset.testid).toBe(to);
  } else if (expectUndo === true) {
    expect(fromPiece.dataset.testid).toBe(from);
  }
};