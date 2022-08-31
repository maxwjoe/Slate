import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle, IItem, IList } from "../../interfaces/DataInterfaces";
import { ITextPosition } from "../../interfaces/IFloatingMenuData";

interface applicationState {
  selectedArticle?: IArticle;
  selectedList?: IList;
  selectedItem?: IItem;
  selectedContentType: string;
  selectedText?: string;
  selectionPosition?: ITextPosition;
  floatingMenuOpen: boolean;
}

const initialState: applicationState = {
  selectedContentType: "",
  floatingMenuOpen: false,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    reset: (state) => initialState,
    clearSelectedItem: (state) => {
      return { ...state, selectedItem: undefined };
    },
    clearSelectedArticle: (state) => {
      return { ...state, selectedArticle: undefined };
    },
    clearSelectedList: (state) => {
      return { ...state, selectedList: undefined };
    },
    setSelectedArticle: (state, action: PayloadAction<IArticle>) => {
      return {
        ...state,
        selectedContentType: "IArticle",
        selectedArticle: action.payload,
        selectedList: undefined,
        selectedItem: undefined,
        selectedText: "",
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
    setSelectedText: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedText: action.payload,
      };
    },
    setSelectionPosition: (state, action: PayloadAction<ITextPosition>) => {
      return {
        ...state,
        selectionPosition: action.payload,
      };
    },
    setFloatingMenuOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        floatingMenuOpen: action.payload,
      };
    },
  },
});

export const {
  reset,
  setSelectedArticle,
  setSelectedList,
  setSelectedItem,
  clearSelectedItem,
  clearSelectedArticle,
  clearSelectedList,
  setSelectedText,
  setSelectionPosition,
  setFloatingMenuOpen,
} = applicationSlice.actions;
export default applicationSlice.reducer;
