import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  firstname: null,
  lastname: null,
  email: null,
  role: null,
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    clearUser: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;