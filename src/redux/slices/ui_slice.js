import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthFormsDialogActive: false,
  navigateToAfterAuthFormSubmitted: "/dashboard",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAuthFormsDialogActive: (state, action) => {
      state.isAuthFormsDialogActive = action.payload?.isAuthDialogActive;
      state.navigateToAfterAuthFormSubmitted = action.payload?.navigateTo;
    },
  },
});

export default uiSlice.reducer;
export const { setAuthFormsDialogActive } = uiSlice.actions;
