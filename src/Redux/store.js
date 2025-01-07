import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "Redux/Slices/AuthSlice";
import bookSliceReducer from "Redux/Slices/BookSlice";
import shelfSliceReducer from "Redux/Slices/ShellSlice";

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    book : bookSliceReducer,
    shelf : shelfSliceReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
