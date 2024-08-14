
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './studentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer
  },
});