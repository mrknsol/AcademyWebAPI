import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../services/ApiService';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest ({
        Url: `http://localhost:5090/api/v1/Groups/Get`,
        Method: 'GET',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData, thunkAPI) => {
    try {
      const response = await apiRequest ({
        Url: 'http://localhost:5090/api/v1/Groups/Create',
        Method: 'POST',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        Data: groupData
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async (group) => {
    const response = await apiRequest ({
      Url: `http://localhost:5090/api/v1/Groups/Edit?groupName=${(group.name)}`,
      Method: 'PUT',
      Headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
      },
      Data: group
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update group: ${errorText}`);
    }

    return await response;
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (name, thunkAPI) => {
    try {
      const response = await apiRequest ({
        Url: `http://localhost:5090/api/v1/Groups/Delete?groupName=${name}`,
        Method: 'DELETE',
        Headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        Data: name
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
  },
  reducers: {
    setEditedGroup(state, action) {
      state.editedGroup = action.payload;
    },
    clearEdit(state) {
      state.editGroupId = null;
      state.editedGroup = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        const index = state.groups.findIndex((group) => group.name === action.payload.name);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        state.editGroupId = null;
        state.editedGroup = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((group) => group.id !== action.payload);
      });
  },
});

export const { setEditGroupId, setEditedGroup, clearEdit } = groupSlice.actions;
export default groupSlice.reducer;