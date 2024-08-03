import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  email: null,
  firstName: null,
  lastName: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload, loggedIn: true };
    },
    logout: (state) => {
      return { ...initialState };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
