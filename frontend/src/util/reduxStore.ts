import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../users/userSlice';

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;