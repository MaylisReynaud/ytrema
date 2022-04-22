import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './state/authSlice';
import { ytremaApi } from './api/ytremaApi';
// import fabricReducer from '../src/components/ArticlesPage/Fabric/fabricSlice'
// import { fabricsApi } from './services/fabric';
// import {api} from './services/api';
// import {login} from './services/login';
// import loginReducer from '../../CLIENT/src/components/Registrationpage/loginSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    [ytremaApi.reducerPath]: ytremaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ytremaApi.middleware)
});

setupListeners(store.dispatch);

