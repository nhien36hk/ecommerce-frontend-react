import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './slides/counterSlide';  // Import default hoặc named export từ counterSlide
import userReducer from './slides/userSlide';  // Import default hoặc named export từ counterSlide
import orderReducer from './slides/orderSlide';  // Import default hoặc named export từ counterSlide
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user']
}
const rootReducer = combineReducers({
  counter: counterReducer, // Gắn reducer trực tiếp
  user: userReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)