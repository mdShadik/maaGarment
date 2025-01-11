import { getAllGroups } from "@/apiRequest/requests/groups";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface ArryState {
  info: any;
  loading: boolean;
  error: string | null;
}

export interface GroupState {
  group: ArryState;
}

const initialState: GroupState = {
  group: {
    info: [],
    loading: false,
    error: null,
  },
};

export const getAllGroup = createAsyncThunk(
    "group/get",
    async (
      { query }: { query?: any; },
      { rejectWithValue }
    ) => {
      try {
        const response = await getAllGroups(query)
  
        if (!response) {
          toast.error("Failed to fetch the groups")
          throw new Error("Failed to fetch group data");
        }
        return response
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupState: (state, action: PayloadAction<Array<Record<string, any>>>) => {
        state.group.info = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroup.pending, (state) => {
        state.group.loading = true;
        state.group.error = null;
      })
      .addCase(getAllGroup.fulfilled, (state, action) => {
        state.group.loading = false;
        state.group.info = action.payload;
      })
      .addCase(getAllGroup.rejected, (state, action) => {
        state.group.loading = false;
        state.group.error = action.payload as string;
      });
  },
});

export const { setGroupState } = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
