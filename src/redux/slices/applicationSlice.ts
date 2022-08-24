import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createReducer,
} from "@reduxjs/toolkit";
import { getItemsFromListId } from "../../helper/dataHelpers";
import { IArticle, IItem, IList } from "../../interfaces/DataInterfaces";

interface applicationState {
  selectedArticle?: IArticle;
  selectedList?: IList;
  selectedItem?: IItem;
  selectedContentType: string;
}

const initialState: applicationState = {
  selectedContentType: "",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setSelectedArticle: (state, action: PayloadAction<IArticle>) => {
      return {
        ...state,
        selectedContentType: "IArticle",
        selectedArticle: action.payload,
        selectedList: undefined,
        selectedItem: undefined,
      };
    },
    setSelectedList: (state, action: PayloadAction<IList>) => {
      return {
        ...state,
        selectedContentType: "IList",
        selectedArticle: undefined,
        selectedList: action.payload,
        selectedItem: undefined,
      };
    },
    setSelectedItem: (state, action: PayloadAction<IItem>) => {
      return {
        ...state,
        selectedItem: action.payload,
      };
    },
  },
});

export const { reset, setSelectedArticle, setSelectedList, setSelectedItem } =
  applicationSlice.actions;
export default applicationSlice.reducer;
