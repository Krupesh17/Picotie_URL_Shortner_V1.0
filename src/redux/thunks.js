import supabase from "@/utils/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchShortLinksByUserId = createAsyncThunk(
  "fetchShortLinksByUserId",
  async (user_id, { rejectWithValue }) => {
    try {
      if (!user_id) {
        throw new Error(
          "Failed to fetch the user's short links: undefined user_id. Please try again."
        );
      }

      const { data, error: shortLinksError } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user_id);

      if (shortLinksError) throw shortLinksError;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchClicksByUrlIdList = createAsyncThunk(
  "fetchClicksByUrlIdList",
  async (url_id_list, { rejectWithValue }) => {
    try {
      if (!url_id_list.length) {
        throw new Error(
          "Failed to fetch the Clicks: undefined url_id_list. Please try again."
        );
      }

      const { data: clicksData, error: clicksError } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", url_id_list);

      if (clicksError) throw clicksError;

      return clicksData;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
