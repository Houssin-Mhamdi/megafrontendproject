import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import baseURL from '../../../utils/baseURL.js'
//init state
const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    }
}

// action creator create asyncThunk
//what come back from action its a pormmise and this promise have 3 lifecycle 

//register action
export const registerUserAction = createAsyncThunk('user/register', async ({ fullname, email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
        //header 
        const config = {
            Headers: {
                "Content-Type": "application/json"
            }
        }
        const res = await axios.post(`${baseURL}/users/register`, {
            fullname,
            email,
            password,
        }, config)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})

//login action
export const loginUserAction = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
        const config = {
            Headers: {
                "Content-Type": "application/json"
            }
        }
        const res = await axios.post(`${baseURL}/users/login`, { email, password }, config)
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

//logout action

export const logoutUserAction = createAsyncThunk('user/logout', async () => {
    localStorage.removeItem('userInfo')
    return null
})

//profile action 

export const getProfileAction = createAsyncThunk('user/profile', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        //get the token from the local storage or from the store
        const token = getState()?.users?.userAuth?.userInfo?.token
        // pass the token to the header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        //make the request
        const { data } = await axios.get(`${baseURL}/users/profile`, config)
        console.log(data);
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

//user slice
const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        //user registrations
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth.userInfo = action.payload;

        })
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.userAuth.error = action.payload;
        })

        //user login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth.userInfo = action.payload;

        })
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.userAuth.error = action.payload;
        })

        //user logout
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth.userInfo = null;

        })

        //profile
        builder.addCase(getProfileAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;

        })
        builder.addCase(getProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.profile = ''
        })

    }

})
//generate reducer

const usersReducer = usersSlice.reducer

export default usersReducer