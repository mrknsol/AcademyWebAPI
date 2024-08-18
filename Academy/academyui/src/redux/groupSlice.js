import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5090/api/v1/Groups/Get', {
        method: 'GET',
        headers: {
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
      const response = await fetch('http://localhost:5090/api/v1/Groups/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async (group) => {
    const response = await fetch(`http://localhost:5090/api/v1/Groups/Edit?groupName=${(group.name)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(group),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update group: ${errorText}`);
    }

    return await response.json();
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (group) => {
    await fetch(`'http://localhost:5090/api/v1/Groups/Delete?groupName=${group.name}`, {
      method: 'DELETE',
    });
    return group.id;
  }
);


const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    status: 'idle',
    error: null,
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