import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { INSERT_TABLE, GET_TABLES } from '../api/endpoints';


export const fetchTables = createAsyncThunk('table/fetchTables', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(GET_TABLES);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : { message: 'Network error' });
  }
});

export const insertTable = createAsyncThunk('table/insertTable', async (newTable, { rejectWithValue }) => {
  try {
    const response = await axios.post(INSERT_TABLE, newTable);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : { message: 'Network error' });
  }
});


const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tables: [],
    loading: false,
    error: null,
    code: null,
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload.data;
        state.code = action.payload.statusCode;
        state.message = "Tables fetched successfully";
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
        state.code = action.payload.status || null;
        state.message = action.payload.message;
      })
      // Handle insertTable actions
      .addCase(insertTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertTable.fulfilled, (state, action) => {
        state.loading = false;
       
        state.code = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(insertTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
        state.code = action.payload.status ;
        state.message = action.payload.message;
      });
  },
});

export default tableSlice.reducer;
