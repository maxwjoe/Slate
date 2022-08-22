import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createReducer,
} from "@reduxjs/toolkit";
import { ISource } from "../../interfaces/DataInterfaces";
import sourceService from "../../services/sourceService";

interface sourceState {
  sources: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: sourceState = {
  sources: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// RDX_getSources : Gets Sources
export const RDX_getSources = createAsyncThunk(
  "sources/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sourceService.getSources(token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_createSource : Creates a new Source
export const RDX_createSource = createAsyncThunk(
  "sources/create",
  async (sourceData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sourceService.createSource(sourceData, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// TODO: RDX_updateSource : Updates a Source

// RDX_deleteSource : Deletes a Source
export const RDX_deleteSource = createAsyncThunk(
  "sources/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sourceService.deleteSource(id, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(RDX_createSource.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_createSource.fulfilled,
        (state, action: PayloadAction<ISource>) => {
          state.isLoading = false;
          state.isSuccess = true;
          try {
            state.sources["sources"].push(action.payload);
          } catch {
            state.sources = action.payload;
          }
        }
      )
      .addCase(RDX_createSource.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_getSources.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_getSources.fulfilled,
        (state, action: PayloadAction<ISource[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.sources = action.payload;
        }
      )
      .addCase(RDX_getSources.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_deleteSource.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(RDX_deleteSource.fulfilled, (state, action) => {
        return {
          ...state,

          isLoading: false,
          isSuccess: true,
          sources:
            state?.sources["sources"]?.filter((source: any) => {
              return source._id !== action.payload.id;
            }) || [],
        };
      })
      .addCase(RDX_deleteSource.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      }),
});

export const { reset } = sourceSlice.actions;
export default sourceSlice.reducer;
