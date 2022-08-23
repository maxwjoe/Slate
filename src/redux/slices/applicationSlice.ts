import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createReducer,
} from "@reduxjs/toolkit";
import { type } from "os";
import { IArticle, IList } from "../../interfaces/DataInterfaces";

interface applicationState {
  selectedArticle?: IArticle;
  selectedList?: IList;
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
      };
    },
    setSelectedList: (state, action: PayloadAction<IList>) => {
      return {
        ...state,
        selectedContentType: "IList",
        selectedArticle: undefined,
        selectedList: action.payload,
      };
    },
  },
});

export const { reset, setSelectedArticle, setSelectedList } =
  applicationSlice.actions;
export default applicationSlice.reducer;
