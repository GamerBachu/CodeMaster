import type { RootState } from "../../redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IToast } from ".";

const initialState: IToast[] = [];

export const toastSlicer = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    createToast: (state, action: PayloadAction<IToast>) => {
      state.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: () => {
      return [];
    },
  },
});

export const { createToast, removeToast, clearToasts } = toastSlicer.actions;

export const selectToasts = (state: RootState) => state.toaster;

export default toastSlicer.reducer;
