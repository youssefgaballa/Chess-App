import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../users/userSlice';
import chessBoardReducer from '../components/chess/chessSlice';

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    chessBoard: chessBoardReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;