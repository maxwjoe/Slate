import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createReducer,
} from "@reduxjs/toolkit";
import { ISource, IArticle } from "../../interfaces/DataInterfaces";
import articleService from "../../services/articleService";

interface articleState {
  articles: IArticle[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: articleState = {
  articles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// RDX_getArticles : Gets articles
export const RDX_getArticles = createAsyncThunk(
  "articles/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await articleService.getArticles(token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_createArticle : Creates a new article
export const RDX_createArticle = createAsyncThunk(
  "articles/create",
  async (ArticleObj: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await articleService.createArticle(ArticleObj, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(RDX_getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_getArticles.fulfilled,
        (state, action: PayloadAction<IArticle[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.articles = action.payload;
        }
      )
      .addCase(RDX_getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_createArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_createArticle.fulfilled,
        (state, action: PayloadAction<IArticle>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.articles.push(action.payload);
        }
      )
      .addCase(RDX_createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      }),
});

export const { reset } = articleSlice.actions;
export default articleSlice.reducer;
