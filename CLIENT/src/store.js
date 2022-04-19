import { configureStore } from '@reduxjs/toolkit';
import fabricReducer from '../src/components/ArticlesPage/Fabric/fabricSlice'
import { fabricsApi } from './services/fabric';

export const store = configureStore({
  reducer: {
      // fabrics : fabricReducer,
      [fabricsApi.reducerPath]: fabricsApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fabricsApi.middleware),
  
});