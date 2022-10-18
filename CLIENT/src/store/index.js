import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './state/authSlice';
import fabricsReducer from './state/fabricSlice';
import haberdasheriesReducer from './state/haberdasherySlice';
import patternsReducer from './state/patternSlice';
import projectsReducer from './state/projectSlice';
import { ytremaApi } from './api/ytremaApi';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
  auth: authReducer,
  fabrics: fabricsReducer,
  haberdasheries: haberdasheriesReducer,
  patterns: patternsReducer,
  projects: projectsReducer
});

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: {
    persistedReducer,
    [ytremaApi.reducerPath]: ytremaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(ytremaApi.middleware)
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

