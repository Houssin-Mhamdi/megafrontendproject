import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../slice/accounts/accountSlice';
import transactionReducer from '../slice/transactions/transactionSlice';
import usersReducer from '../slice/users/userSlice';
const store = configureStore({
    reducer: {
        users: usersReducer,
        accounts: accountsReducer,
        transactions: transactionReducer,
    }
})

export default store;