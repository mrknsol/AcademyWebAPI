import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../services/ApiService';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({
        Url: 'http://localhost:5090/api/v1/Teachers/Get',
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

export const addTeacher = createAsyncThunk(
  'teachers/addTeacher',
  async (teacherData, thunkAPI) => {
    try {
      const response = await apiRequest ({
        Url: 'http://localhost:5090/api/v1/Teachers/Add',
        Method: 'POST',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        Data: teacherData
      });

      if (!response.ok) {
        throw new Error('Failed to add teacher');
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  'teachers/updateTeachers',
  async (teacher, thunkAPI) => {
    try {
      const response = await apiRequest({
        Url: `http://localhost:5090/api/v1/Teachers/Edit?email=${teacher.email}`,
        Method: 'PUT',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        Data: teacher,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
    'teachers/deleteTeacher',
    async (email, thunkAPI) => {
      try {
        const response = await apiRequest ({
          Url: `http://localhost:5090/api/v1/Teachers/Delete?email=${email}`,
          Method: 'DELETE',
          Headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          },
          Data: email
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete teacher');
        }
  
        return response;
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
        state.teachers = state.teachers.filter((teacher) => teacher.user.email !== action.payload.user.email);
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