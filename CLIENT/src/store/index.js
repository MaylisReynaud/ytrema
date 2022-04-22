import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './state/authSlice';
import { authApi } from './api/authApi';
// import fabricReducer from '../src/components/ArticlesPage/Fabric/fabricSlice'
// import { fabricsApi } from './services/fabric';
// import {api} from './services/api';
// import {login} from './services/login';
// import loginReducer from '../../CLIENT/src/components/Registrationpage/loginSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

