import type { RootState } from "../../redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IToast } from ".";
import { generateGuidV2 } from "../../utils/helper/guid";

const initialState: IToast[] = [];

export const toastSlicer = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    createToast: (state, action: PayloadAction<IToast>) => {

      if (!action.payload.id) action.payload.id = generateGuidV2();
      if (!action.payload.show) action.payload.show = true;
      if (!action.payload.time) action.payload.time = "";
      if (!action.payload.title) action.payload.title = "";
      if (!action.payload.description) action.payload.description = "";
      if (!action.payload.type) action.payload.type = "info";
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
