import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  firstname: null,
  lastname: null,
  role: null,
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
    },
    clearUser: (state) => {
      state = initialState;
    },
  },
});

export const selectUser = (state: { userDetails: typeof initialState }) => state.userDetails;
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;