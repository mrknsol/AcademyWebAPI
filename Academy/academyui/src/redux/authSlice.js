import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../services/ApiService';

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }) => {
//     const response = await fetch("http://localhost:5090/api/v1/Auth/Login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || 'Network response was not ok');
//     }

//     const data = await response.json();

//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);
//     localStorage.setItem("refershTokenExpiry", data.refreshTokenExpireTime);
//     return data;
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async ({ name, surname, age, email, password, confirmPassword }) => {
//     const response = await fetch("http://localhost:5090/api/v1/Auth/Register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, surname, age, email, password, confirmPassword }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || 'Network response was not ok');
//     }

//     const data = await response.json();
//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);
//     localStorage.setItem("refreshTokenExpiry", data.refreshTokenExpireTime);
    
//     return data;
//   }
// );

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    try {
      const data = await apiRequest({
        Url: "http://localhost:5090/api/v1/Auth/Login",
        Method: "POST",
        Data: { email, password }
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("refreshTokenExpiry", data.refreshTokenExpireTime);

      return data;
    } catch (error) {
      throw new Error(error.response?.data || 'Network response was not ok');
    }
  }
);
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user) => {
    try {
      const apiData = {
        Url: "http://localhost:5090/api/v1/Auth/Register",
        Method: "POST",
        Data: user,
      };

      const data = await apiRequest(apiData);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("refreshTokenExpiry", data.refreshTokenExpireTime);

      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Network response was not ok');
    }
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
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;