import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../services/ApiService';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({
        Url: 'http://localhost:5090/api/v1/Students/Get',
        Method: 'GET',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, thunkAPI) => {
    try {
      console.log(studentData);
      const response = await apiRequest({
        Url: 'http://localhost:5090/api/v1/Students/Add',
        Method: 'POST',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        Data: studentData,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (student, thunkAPI) => {
    try {
      const response = await apiRequest({
        Url: `http://localhost:5090/api/v1/Students/Edit?email=${student.email}`,
        Method: 'PUT',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        Data: student,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentEmail, thunkAPI) => {
    try {
      const response = await apiRequest({
        Url: `http://localhost:5090/api/v1/Students/Delete?email=${studentEmail}`,
        Method: 'DELETE',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    editStudentId: null,
    editedStudent: {
      name: '',
      surname: '',
      email: '',
    },
    error: null,
    status: 'idle',
  },
  reducers: {
    setEditStudentId: (state, action) => {
      state.editStudentId = action.payload;
    },
    setEditedStudent: (state, action) => {
      state.editedStudent = action.payload;
    },
    clearEdit: (state) => {
      state.editStudentId = null;
      state.editedStudent = {
        name: '',
        surname: '',
        email: '',
      };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student.email === action.payload.email);
        if (index >= 0) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student.email !== action.payload.email);
      });
  }
});

export const { setEditStudentId, setEditedStudent, clearEdit } = studentSlice.actions;
export default studentSlice.reducer;