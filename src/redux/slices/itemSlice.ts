import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createReducer,
} from "@reduxjs/toolkit";
import { IItem } from "../../interfaces/DataInterfaces";
import Itemservice from "../../services/itemService";

interface Itemstate {
  items: IItem[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: Itemstate = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// RDX_getItems : Gets Items
export const RDX_getItems = createAsyncThunk(
  "Items/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Itemservice.getItems(token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_createItem : Creates a new Item
export const RDX_createItem = createAsyncThunk(
  "Items/create",
  async (ItemObj: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Itemservice.createItem(ItemObj, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_updateItem : Updates a Item
export const RDX_updateItem = createAsyncThunk(
  "Items/update",
  async (ItemData: IItem, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Itemservice.updateItem(ItemData, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_deleteItem : Deletes a Item
export const RDX_deleteItem = createAsyncThunk(
  "Items/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await Itemservice.deleteItem(id, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const Itemslice = createSlice({
  name: "Item",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(RDX_getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_getItems.fulfilled,
        (state, action: PayloadAction<IItem[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.items = action.payload;
        }
      )
      .addCase(RDX_getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_createItem.fulfilled,
        (state, action: PayloadAction<IItem>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.items.push(action.payload);
        }
      )
      .addCase(RDX_createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_updateItem.fulfilled,
        (state, action: PayloadAction<IItem>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const mutatedSourceIndex: number = state.items.findIndex(
            (Item: IItem) => Item._id === action.payload._id
          );
          state.items[mutatedSourceIndex] = action.payload;
        }
      )
      .addCase(RDX_updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_deleteItem.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(RDX_deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.filter(
          (source: IItem) => source._id !== action.payload.id
        );
      })
      .addCase(RDX_deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      }),
});

export const { reset } = Itemslice.actions;
export default Itemslice.reducer;
