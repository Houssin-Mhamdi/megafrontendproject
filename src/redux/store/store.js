import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../slice/accounts/accountSlice';
import usersReducer from '../slice/users/userSlice';
const store = configureStore({
    reducer: {
        users: usersReducer,
        accounts: accountsReducer
    }
})

export default store;