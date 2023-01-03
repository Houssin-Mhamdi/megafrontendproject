import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

const initialState = {
    transactions: [],
    transaction: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
}

export const createTransAction = createAsyncThunk('transactions/create', async (payload, { rejectWithValue, getState, dispatch }) => {
    const { account, name, transactionType, amount, category, notes } = payload
    try {
        const token = getState()?.users.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.post(`${baseURL}/transactions`, {
            account,
            account:payload.id,
            name,
            transactionType,
            amount,
            category,
            notes
        }, config)
        return data
    } catch (error) {
        return rejectWithValue(error?.response.data)
    }
})

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createTransAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createTransAction.fulfilled, (state, action) => {
            state.loading = false
            state.isAdded = true
            state.transaction = action.payload


        })
        builder.addCase(createTransAction.rejected, (state, action) => {
            state.loading = false
            state.isAdded = true
            state.transaction = null
            state.error = action.payload
        })
    }
})  

const transactionReducer = transactionSlice.reducer
export default transactionReducer; 