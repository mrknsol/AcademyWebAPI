
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5090/api/v1/Teachers/Get', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTeacher = createAsyncThunk(
  'teachers/addTeacher',
  async (teacherData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5090/api/v1/Teachers/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(teacherData),
      });

      if (!response.ok) {
        throw new Error('Failed to add teacher');
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  'teacher/updateTeacher',
  async (teacher, thunkAPI) => {
      try {
          const response = await fetch(`http://localhost:5090/api/v1/Teachers/Edit?email=${teacher.user.email}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(teacher.user),
          });

          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Failed to update teacher: ${errorText}`);
          }

          return teacher;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
      }
  }
);

export const deleteTeacher = createAsyncThunk(
    'teachers/deleteTeacher',
    async (teacher, thunkAPI) => {
      try {
        const response = await fetch(`http://localhost:5090/api/v1/Teachers/Delete?email=${teacher.user.email}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete teacher');
        }
  
        return teacher.user;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    editTeacherId: null,
    editedTeacher: {},
    error: null,
    status: 'idle',
  },
  reducers: {
    setEditTeacherId: (state, action) => {
      state.editTeacherId = action.payload;
    },
    setEditedTeacher: (state, action) => {
      state.editedTeacher = action.payload;
    },
    clearEdit: (state) => {
      state.editTeacherId = null;
      state.editedTeacher = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTeacher.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateTeacher.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.map((teacher) =>
          teacher.user.email === action.payload.user.email ? action.payload : teacher
        );
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.students = state.students.filter((student) => student.user.email !== action.payload.user.email);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setEditTeacherId, setEditedTeacher, clearEdit } = teacherSlice.actions;
export default teacherSlice.reducer;