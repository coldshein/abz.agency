import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    page: 1,
}

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (page, {dispatch}) => {
        const {data} = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
        dispatch(setUsers(data.users))
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setPage: (state,action) => {
            state.page++
        }
    }
})
export const {setUsers, setPage} = userSlice.actions

export default userSlice.reducer