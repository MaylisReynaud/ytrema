import { configureStore } from '@reduxjs/toolkit';
import fabricReducer from '../src/components/ArticlesPage/Fabric/fabricSlice'
import { fabricsApi } from './services/fabric';
// import {api} from './services/api';
import {login} from './services/login';
import loginReducer from '../../CLIENT/src/components/Registrationpage/loginSlice';


export const store = configureStore({
  reducer: {
      // fabrics : fabricReducer,
      // [fabricsApi.reducerPath]: fabricsApi.reducer,
    
    [login.reducerPath]: login.reducer,
    login: loginReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(fabricsApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(login.middleware),
  
});

