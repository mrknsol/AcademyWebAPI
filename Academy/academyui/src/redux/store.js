
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './studentSlice';
import teacherReducer from './teacherSlice';
import groupReducer from './groupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    teachers: teacherReducer,
    groups: groupReducer
  },
});