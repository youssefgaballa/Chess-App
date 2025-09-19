import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  username: string | null;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  role: string | null;
  accessToken: string | null;
};

const initialState: UserState = {
  username: null,
  email: null,
  firstname: null,
  lastname: null,
  role: null,
  accessToken: null
  // redux store is in memory only, so accessToken will be lost on refresh
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state = initialState;
    },
  },
});

export const selectUser = (state: { userDetails: typeof initialState }) => state.userDetails;
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;