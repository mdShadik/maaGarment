import { getAllUsersApi, getUserbyIdApi } from "@/apiRequest/apiMethods/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface ArryState {
  info: any;
  loading: boolean;
  error: string | null;
}

export interface GroupState {
  usersList: ArryState;
  userDetail: ArryState;
}

const initialState: GroupState = {
  usersList: {
    info: [],
    loading: false,
    error: null,
  },
  userDetail: {
    info: [],
    loading: false,
    error: null,
  },
};

export const getAllUser = createAsyncThunk(
    "users/get",
    async (
      { query }: { query?: any; },
      { rejectWithValue }
    ) => {
      try {
        const response = await getAllUsersApi(query)
  
        if (!response) {
          toast.error("Failed to fetch the users")
          throw new Error("Failed to fetch users data");
        }
        return response
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const getUserById = createAsyncThunk(
    "user/getId",
    async (
      id : any,
      { rejectWithValue }
    ) => {
      try {
        const response = await getUserbyIdApi(id)
  
        if (!response) {
          toast.error("Failed to fetch the user")
          throw new Error("Failed to fetch user data");
        }
        return response
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

export const userSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<Array<Record<string, any>>>) => {
        state.usersList.info = action.payload;
      },
    setUserByIdState: (state, action: PayloadAction<any>) => {
      state.userDetail.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.usersList.loading = true;
        state.usersList.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.usersList.loading = false;
        state.usersList.info = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.usersList.loading = false;
        state.usersList.error = action.payload as string;
      });

    builder
      .addCase(getUserById.pending, (state) => {
        state.userDetail.loading = true;
        state.userDetail.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userDetail.loading = false;
        state.userDetail.info = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userDetail.loading = false;
        state.userDetail.error = action.payload as string;
      });
  },
  
});

export const { setUserState, setUserByIdState } = userSlice.actions;
export const userReducer = userSlice.reducer;
