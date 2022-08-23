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

// RDX_updateArticle : Updates an Article
export const RDX_updateArticle = createAsyncThunk(
  "articles/update",
  async (ArticleData: IArticle, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await articleService.updateArticle(ArticleData, token);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// RDX_deleteArticle : Deletes an Article
export const RDX_deleteArticle = createAsyncThunk(
  "articles/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await articleService.deleteArticle(id, token);
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
      })
      .addCase(RDX_updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_updateArticle.fulfilled,
        (state, action: PayloadAction<IArticle>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const mutatedSourceIndex: number = state.articles.findIndex(
            (article: IArticle) => article._id === action.payload._id
          );
          state.articles[mutatedSourceIndex] = action.payload;
        }
      )
      .addCase(RDX_updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(RDX_deleteArticle.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(RDX_deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.articles = state.articles.filter(
          (source: IArticle) => source._id !== action.payload.id
        );
      })
      .addCase(RDX_deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      }),
});

export const { reset } = articleSlice.actions;
export default articleSlice.reducer;
