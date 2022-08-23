import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sourceReducer from "./slices/sourceSlice";
import articleReducer from "./slices/articleSlice";
import listReducer from "./slices/listSlice";
import applicationReducer from "./slices/applicationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sources: sourceReducer,
    articles: articleReducer,
    lists: listReducer,
    applicationState: applicationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
