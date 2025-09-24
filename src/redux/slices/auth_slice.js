import supabase from "@/utils/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDashboardData } from "./dashboard_slice";

const initialState = {
  user: null,
  isLoading: true,
  isInitialized: false,
  error: null,
};

export const fetchUserSession = createAsyncThunk(
  "auth/fetchUserSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      await dispatch(fetchDashboardData(sessionData?.session?.user?.id));

      return sessionData?.session?.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthData: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
      state.isLoading = false;
    },
    updateAuthData: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(fetchUserSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { clearAuthData, setInitialized, updateAuthData } =
  authSlice.actions;
