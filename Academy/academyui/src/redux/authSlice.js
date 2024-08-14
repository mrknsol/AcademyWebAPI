import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    const response = await fetch("http://localhost:5090/api/v1/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Network response was not ok');
    }

    const data = await response.json();

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("refershTokenExpiry", data.refreshTokenExpireTime);
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, surname, age, email, password, confirmPassword }) => {
    const response = await fetch("http://localhost:5090/api/v1/Auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, age, email, password, confirmPassword }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Network response was not ok');
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("refreshTokenExpiry", data.refreshTokenExpireTime);
    
    return data;
  }
);
const initialState = {
  isAuthenticated: false,
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  error: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;