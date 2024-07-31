import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemDescription: '',
  lineVisible: true,
  eraseInverse: false,
  drawable: true
};

export const promptSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    describe: (state, action) => {
      state.itemDescription = action.payload;
    },
    clearView:  (state) => {
      state.lineVisible = false;
      state.drawable = false
    },
    generate: (state) => {
      state.eraseInverse = false;
      state.lineVisible = true
      state.drawable = false
    },
    bingSearch: (state) => {
      state.eraseInverse = true;
      state.lineVisible = false;
      state.drawable = false
    }
  },
});

export const { describe, clearView, generate, bingSearch } = promptSlice.actions;

export default promptSlice.reducer;
