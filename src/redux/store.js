import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import orderReducer from './orderSlice'; // Import your orderSlice

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
import sessionStorage from 'redux-persist/lib/storage/session'; // Use sessionStorage instead of localStorage

// Configure redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage, // Persist the store in sessionStorage
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer, // Add orderReducer here
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor for the store
export let persistor = persistStore(store);
