import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice';
import {apiSlice} from '../apiSlices/apiSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;