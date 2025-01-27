import { getImportUpload as getImportUploadApi } from "@/apiRequest/requests/import";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface ArryState {
  info: any;
  loading: boolean;
  error: string | null;
}

export interface OptionState {
  import: ArryState;
}

const initialState: OptionState = {
  import: {
    info: {},
    loading: false,
    error: '',
  },
};

  export const getImportUpload = createAsyncThunk(
    "import/getBulkUpload",
    async (
      { query }: { query?: any; },
      { rejectWithValue }
    ) => {
      try {
        const response = await getImportUploadApi(query)
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

export const importSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setImportState: (state, action: PayloadAction<Array<Record<string, any>>>) => {
      state.import.info = action.payload;
    },
},
extraReducers: (builder) => {
  builder
    .addCase(getImportUpload.pending, (state) => {
      state.import.loading = true;
      state.import.error = null;
    })
    .addCase(getImportUpload.fulfilled, (state, action) => {
      state.import.loading = false;
      state.import.info = action.payload;
    })
    .addCase(getImportUpload.rejected, (state, action) => {
      state.import.loading = false;
      state.import.error = action.payload as string;
    });
  },
  
});

export const { setImportState } = importSlice.actions;
export const importReducer = importSlice.reducer;
