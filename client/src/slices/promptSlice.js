import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemDescription: '',
};

export const promptSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    describe: (state, action) => {
      state.itemDescription = action.payload;
    },
  },
});

export const { describe } = promptSlice.actions;

export default promptSlice.reducer;
