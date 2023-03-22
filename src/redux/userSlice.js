import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    page: 1,
    positions: [],
    token: {},
    signup: {},
    isLoading: '',
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
    'user/postUser',
    async ({requestOptions},{rejectWithValue}) => {
        try{
            const {data} = await axios.post(`https://frontend-test-assignment-api.abz.agency/api/v1/users`, requestOptions);
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

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
        setSignUp: (state, action) => {
            state.signup = action.payload
        }
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
    }
})
export const { setUsers, setPage, setPositions, setToken, setSignUp } = userSlice.actions

export default userSlice.reducer