import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    page: 1,
    positions: [],
    token: {},
    signUp: {},
    isLoading: 'null',
    error: null,
}

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async (page, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
            dispatch(setUsers(data.users))
            return data.users;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const postUser = createAsyncThunk(
    'users/postUser',
    async (formData, { rejectWithValue, getState }) => {
      const token = getState().user.token;
      const config = {
        headers: { 'Token': token },
      };
  
      try {
        const data = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, config);
        console.log(data);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data); // return the error data using rejectWithValue
      }
    }
  );

export const getUserById = createAsyncThunk(    
    'user/getUserById',
    async (_,{rejectWithValue}) => {
        try {
            const resp = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users/1`)
            console.log(resp);
            return resp;
            
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)
export const getPositions = createAsyncThunk(
    'user/getPositions',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`);
            dispatch(setPositions(data.positions))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const getToken = createAsyncThunk(
    'user/getToken',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/token`);
            dispatch(setToken(data.token));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPage: (state) => {
            state.page++
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setPositions: (state, action) => {
            state.positions = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state) => {
            state.isLoading = 'pending';
            state.error = null;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = 'fulfilled';
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.isLoading = 'rejected';
            state.error = action.error.message
        })
        .addCase(postUser.pending , (state) => {
            state.signUp = 'pending';
            state.error = null;
        })
        .addCase(postUser.fulfilled, (state) => {
            state.signUp = 'fulfilled';
        })
        .addCase(postUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.signUp = 'rejected';
        })
        
    }
})
export const { setUsers, setPage, setPositions, setToken, setSignUp, reset } = userSlice.actions

export default userSlice.reducer