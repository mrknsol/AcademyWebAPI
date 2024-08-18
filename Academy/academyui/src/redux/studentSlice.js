import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5090/api/v1/Students/Get', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5090/api/v1/Students/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add student: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (student, thunkAPI) => {
      try {
          const response = await fetch(`http://localhost:5090/api/v1/Students/Edit?email=${student.user.email}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(student.user),
          });

          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Failed to update student: ${errorText}`);
          }

          return student;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
      }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (student, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5090/api/v1/Students/Delete?email=${student.user.email}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete student: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addStudent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.students = state.students.map((student) =>
          student.user.email === action.payload.user.email ? action.payload : student
        );
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((student) => student.user.email !== action.payload.user.email);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setEditStudentId, setEditedStudent, clearEdit } = studentSlice.actions;
export default studentSlice.reducer;
