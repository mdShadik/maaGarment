import { getAllGroups, getGroupById as getGroupByIdApi } from "@/apiRequest/requests/groups";
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
  groupInfo: ArryState;
  groupOptions: Array<Record<string, any>>;
}

const initialState: GroupState = {
  group: {
    info: [],
    loading: false,
    error: null,
  },
  groupInfo: {
    info: {},
    loading: false,
    error: null,
  },
  groupOptions: [],
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


  export const getGroupById = createAsyncThunk(
    "group/getId",
    async (
      id : any,
      { rejectWithValue }
    ) => {
      try {
        const response = await getGroupByIdApi(id)
  
        if (!response) {
          toast.error("Failed to fetch the group")
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
    setGroupOptState: (state, action: PayloadAction<Array<Record<string, any>>>) => {
      state.groupOptions = action.payload;
    },
    setGroupByIdState: (state, action: PayloadAction<any>) => {
      state.groupInfo.info = action.payload;
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
    builder
      .addCase(getAllGroupForOptions.pending, (state) => {
        state.group.loading = true;
        state.group.error = null;
      })
      .addCase(getAllGroupForOptions.fulfilled, (state, action) => {
        state.group.loading = false;
        state.group.info = action.payload;
      })
      .addCase(getAllGroupForOptions.rejected, (state, action) => {
        state.group.loading = false;
        state.group.error = action.payload as string;
      });

    builder
      .addCase(getGroupById.pending, (state) => {
        state.groupInfo.loading = true;
        state.groupInfo.error = null;
      })
      .addCase(getGroupById.fulfilled, (state, action) => {
        state.groupInfo.loading = false;
        state.groupInfo.info = action.payload;
      })
      .addCase(getGroupById.rejected, (state, action) => {
        state.groupInfo.loading = false;
        state.groupInfo.error = action.payload as string;
      });
  },
  
});

export const { setGroupState, setGroupByIdState, setGroupOptState } = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
