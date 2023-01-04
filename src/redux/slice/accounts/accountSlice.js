import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

const initialState = {
    account: {},
    accounts: [],
    error: null,
    loading: false,
    success: false,
    isUpdatae: false,
}

export const createAcountAction = createAsyncThunk('account/create', async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, initialBalance, accountType, notes } = payload
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(`${baseURL}/accounts}`,
            {
                name,
                initialBalance,
                accountType,
                notes,
            },
            config)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})

export const getSingleAcountAction = createAsyncThunk('account/get-details', async (id, { rejectWithValue, getState, dispatch }) => {
    
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.get(`${baseURL}/accounts/${id}`,
            config)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})

export const updateAcountAction = createAsyncThunk('account/update', async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, initialBalance, accountType, notes, id } = payload
    try {
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`${baseURL}/accounts/${id}`,
            {
                name,
                initialBalance,
                accountType,
                notes,
            },
            config
            );
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }

})

  


const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    extraReducers: (builder) => {
        // create account
        builder.addCase(createAcountAction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createAcountAction.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.account = action.payload
        })
        builder.addCase(createAcountAction.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.account = null
            state.error = action.payload
        })

        //fetch singl account
        builder.addCase(getSingleAcountAction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getSingleAcountAction.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.account = action.payload
        })
        builder.addCase(getSingleAcountAction.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.account = null
            state.error = action.payload
        })

        //update account
        builder.addCase(updateAcountAction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateAcountAction.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.isUpdatae = true
            state.account = action.payload
        })
        builder.addCase(updateAcountAction.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.account = null
            state.isUpdatae = false
            state.error = action.payload
        })
    }

})

const accountsReducer = accountSlice.reducer;
export default accountsReducer