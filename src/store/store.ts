import { configureStore } from "@reduxjs/toolkit";
import scholarshipReducer from "../feature/Scholarship/scholarshipSlice";
// ...

export const store = configureStore({
  reducer: {
    scholarship: scholarshipReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
