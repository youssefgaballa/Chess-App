import {describe, expect, it} from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Colors } from './ChessBoardWrapper';
import ChessBoard8x8 from './ChessBoard8x8';
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../util/reduxStore';

describe('Initial rendering of ChessBoard8x8 Component', () => {
  it('renders every piece in the correct initial position', () => {
    const colors = Colors['light/dark'];
    render(
      <Provider store={store}>
      <ChessBoard8x8 colors={colors} />
      </Provider>);

    // Check if all pieces are rendered in their initial positions
    for (let i = 0; i < 32; i++) {
      const piece = screen.getByTestId(`${i}`);
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
  
});