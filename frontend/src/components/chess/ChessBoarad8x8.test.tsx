import { beforeEach, describe, expect, it} from 'vitest';
import '@testing-library/jest-dom/vitest';
import { ChessBoardWrapper } from './ChessBoardWrapper';
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { afterEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit';
import chessBoardReducer from './chessSlice';
import userReducer from '../../users/userSlice';

beforeEach(async () => {
  const store = configureStore({
    reducer: {
      userDetails: userReducer,
      chessBoard: chessBoardReducer,
    },
  });
  await render(
    <Provider store={store}>
        <ChessBoardWrapper />
      </Provider>);
  });

  afterEach(async () => {
    await cleanup();
  });
  describe('Initial rendering of ChessBoard8x8 Component', () => {


  it('renders every piece in the correct initial position', async() => {

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

  it('moves a piece when clicked on a valid square and can take pieces', async () => {


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
    await movePiece('e4', 'd5');
    expect(d7).not.toBeInTheDocument();
    expect(e2.dataset.testid).toBe('d5');
    //console.log("e2.dataset.testid:", e2.dataset.testid);
    //screen.logTestingPlaygroundURL()

  });
});




describe("ChessBoard8x8 Check Tests", () => {

  it("Renders the check indicator when in check", async () => {
    await movePiece('e2', 'e4');
    await movePiece('d7', 'd5');
    await movePiece('f1', 'b5');
    //screen.logTestingPlaygroundURL()
    const checkIndicator = screen.getByTestId('check-indicator');
    expect(checkIndicator).toBeInTheDocument();
    expect(checkIndicator).toHaveAttribute('id', 'e8');

  });

  it("Undo move that doesnt block check and checks can be blocked", async () => {
    await movePiece('e2', 'e4');
    await movePiece('d7', 'd5');
    await movePiece('f1', 'b5');
    const e7 = screen.getByTestId('e7');
    await movePiece('e7', 'e6', true);

    const checkIndicator = screen.getByTestId('check-indicator');
    expect(checkIndicator).toBeInTheDocument();
    expect(checkIndicator).toHaveAttribute('id', 'e8');
    expect(e7.dataset.testid).toBe('e7');
    await movePiece('c7', 'c6');
    expect(checkIndicator).not.toBeInTheDocument();    
  });

  it("Undo moves that puts you in check", async () => {
    await movePiece('e2', 'e4');
    await movePiece('d7', 'd5');
    await movePiece('f1', 'b5');
    await movePiece('d8', 'd7'); 
    await movePiece('h2', 'h3'); 
    const d7 = screen.getByTestId('d7');
    await movePiece('d7', 'e6', true);
    const checkIndicator = screen.queryByTestId('check-indicator');
    expect(checkIndicator).not.toBeInTheDocument();    
    expect(d7.dataset.testid).toBe('d7');
  });

  it("Checked with discovered attack", async () => {
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
  });

  it("Player in check moves piece to block check whilst checking other king", async () => {
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
    await movePiece('b8', 'c6');
    // screen.logTestingPlaygroundURL()
    checkIndicator = screen.getByTestId('check-indicator');
    expect(checkIndicator).toHaveAttribute('id', 'd4');
    
  });


});

describe("ChessBoard8x8 Checkmate Tests", () => {

  it("4 move Checkmate with queen and bishop", async () => {
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
  });

});

const movePiece = async (from: string, to: string, expectUndo?: boolean) => {
  const fromSquare = screen.getByTestId(`sq-${from}`);
  const fromPiece = screen.getByTestId(from);
  expect(fromSquare).toBeInTheDocument();
  expect(fromPiece.dataset.testid).toBe(from);
  const toSquare = screen.getByTestId(`sq-${to}`);
  await userEvent.click(fromSquare);
  await userEvent.click(toSquare);
  // expect(fromSquare).toBeInTheDocument();
  // expect(toSquare).toBeInTheDocument();
  if (expectUndo == undefined || expectUndo === false) {
    //console.log("expectUndo is false");
    expect(fromPiece.dataset.testid).toBe(to);
  } else if (expectUndo === true) {
    expect(fromPiece.dataset.testid).toBe(from);
  }
};