import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import promptReducer from './slices/promptSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    prompt: promptReducer
  },
});
