import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    page: 1,
    positions: [],
    token: {},
    signup: {},
}

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async (page, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
            dispatch(setUsers(data.users))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const postUser = createAsyncThunk(
    'user/postUser',
    async ({requsetOptions}, {dispatch,rejectWithValue}) => {
        try {
            const {data} = await axios('https://frontend-test-assignment-api.abz.agency/api/v1/users', requsetOptions)
            dispatch(setSignUp(data));
            console.log(data);  
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
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setPage: (state) => {
            state.page++
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
    }
})
export const { setUsers, setPage, setPositions, setToken, setSignUp } = userSlice.actions

export default userSlice.reducer