import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slides/counterSlide';  // Import default hoặc named export từ counterSlide
import userReducer from './slides/userSlide';  // Import default hoặc named export từ counterSlide

export const store = configureStore({
  reducer: {
    counter: counterReducer,  // Gắn reducer vào state "counter"
    user: userReducer
  },
});
