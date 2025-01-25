import { getAllGroups, getGroupById as getGroupByIdApi } from "@/apiRequest/requests/groups";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface ArryState {
  info: any;
  loading: boolean;
  error: string | null;
}

export interface OptionState {
  groupOptions: any;
}

const initialState: OptionState = {
  groupOptions: [],
};

  export const getAllGroupForOptions = createAsyncThunk(
    "group/getOptions",
    async () => {
      try {
        const response = await getAllGroups()
        if (!response) {
          toast.error("Failed to fetch the groups")
          throw new Error("Failed to fetch group data");
        }
        return response
      } catch (error: any) {
        throw (error.message);
      }
    }
  );

export const optionSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupOptState: (state, action: PayloadAction<Array<Record<string, any>>>) => {
      state.groupOptions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupForOptions.fulfilled, (state, action) => {
        state.groupOptions = action.payload;
      })
  },
  
});

export const { setGroupOptState } = optionSlice.actions;
export const optionReducer = optionSlice.reducer;
