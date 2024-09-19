import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN ,REGISTER,LOGOUT} from '../api/endpoints';


export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(LOGIN, credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : { message: 'Network error' });
  }
});

export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(REGISTER, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : { message: 'Network error' });
  }
});


export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(LOGOUT);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : { message: 'Network error' });
  }
});



const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    code:null,
    message:""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.code =action.payload.statusCode;
        state.message = action.payload.message;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.code =action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.code = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.code = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
