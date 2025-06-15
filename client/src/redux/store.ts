import { configureStore } from "@reduxjs/toolkit";
import toastSlicer from "../components/toasts/toastSlicer";

const store = configureStore({
  reducer: {
    toaster: toastSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
