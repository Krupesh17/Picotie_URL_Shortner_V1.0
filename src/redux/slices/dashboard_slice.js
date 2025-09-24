import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchClicksByUrlIdList, fetchShortLinksByUserId } from "../thunks";

const initialState = {
  shortLinks: [],
  clicks: [],
  isLoading: true,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (user_id, { dispatch, rejectWithValue }) => {
    try {
      const shortLinks = await dispatch(
        fetchShortLinksByUserId(user_id)
      ).unwrap();

      const shortLinkIds = shortLinks?.map((shortLink) => shortLink?.id);

      let clicks = [];
      if (shortLinkIds?.length) {
        clicks = await dispatch(fetchClicksByUrlIdList(shortLinkIds)).unwrap();
      }

      return { shortLinks, clicks };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateShortLinksData: (state, action) => {
      state.shortLinks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateClicksData: (state, action) => {
      state.clicks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearDashboardData: (state) => {
      state.shortLinks = [];
      state.clicks = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortLinksByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShortLinksByUserId.fulfilled, (state, action) => {
        state.shortLinks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchShortLinksByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchClicksByUrlIdList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClicksByUrlIdList.fulfilled, (state, action) => {
        state.clicks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchClicksByUrlIdList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.shortLinks = action.payload.shortLinks;
        state.clicks = action.payload?.clicks;
        state.isLoading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
export const { updateShortLinksData, updateClicksData, clearDashboardData } =
  dashboardSlice.actions;
