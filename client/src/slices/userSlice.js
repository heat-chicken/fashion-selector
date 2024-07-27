import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  email: null,
  firstName: null,
  lastName: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload, loggedIn: true };
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
