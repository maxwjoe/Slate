import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createReducer,
} from "@reduxjs/toolkit";
import { IList } from "../../interfaces/DataInterfaces";
import Listservice from "../../services/listService";

interface liststate {
  lists: IList[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: liststate = {
  lists: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// RDX_getLists : Gets Lists
export const RDX_getLists = createAsyncThunk(
  "Lists/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Listservice.getLists(token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_createList : Creates a new List
export const RDX_createList = createAsyncThunk(
  "Lists/create",
  async (ListObj: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Listservice.createList(ListObj, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_updateList : Updates a List
export const RDX_updateList = createAsyncThunk(
  "Lists/update",
  async (ListData: IList, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Listservice.updateList(ListData, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_deleteList : Deletes a List
export const RDX_deleteList = createAsyncThunk(
  "Lists/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Listservice.deleteList(id, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listslice = createSlice({
  name: "list",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(RDX_getLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_getLists.fulfilled,
        (state, action: PayloadAction<IList[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.lists = action.payload;
        }
      )
      .addCase(RDX_getLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_createList.fulfilled,
        (state, action: PayloadAction<IList>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.lists.push(action.payload);
        }
      )
      .addCase(RDX_createList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_updateList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_updateList.fulfilled,
        (state, action: PayloadAction<IList>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const mutatedSourceIndex: number = state.lists.findIndex(
            (List: IList) => List._id === action.payload._id
          );
          state.lists[mutatedSourceIndex] = action.payload;
        }
      )
      .addCase(RDX_updateList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_deleteList.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(RDX_deleteList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists.filter(
          (source: IList) => source._id !== action.payload.id
        );
      })
      .addCase(RDX_deleteList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      }),
});

export const { reset } = listslice.actions;
export default listslice.reducer;
