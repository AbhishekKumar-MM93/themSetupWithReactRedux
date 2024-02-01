// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer"; // Assuming you have your reducers in a separate file

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Enable Redux Thunk middleware
    }),
});

export default store;
