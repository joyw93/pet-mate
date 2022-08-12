import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchPosts: [],
  hashtagSearchPosts: [],
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: null,
  loadSearchPostsLoading: false,
  loadSearchPostsDone: false,
  loadSearchPostsError: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    loadHashtagPostsRequest(state, action) {
      state.loadHashtagPostsLoading = true;
      state.loadHashtagPostsDone = false;
      state.loadHashtagPostsError = null;
    },
    loadHashtagPostsSuccess(state, action) {
      state.loadHashtagPostsLoading = false;
      state.loadHashtagPostsDone = true;
      state.hashtagSearchPosts = action.payload.data;
    },
    loadHashtagPostsFailure(state, action) {
      state.loadHashtagPostsLoading = false;
      state.loadHashtagPostsError = action.payload.error;
    },
    loadSearchPostsRequest(state, action) {
      state.loadHashtagPostsLoading = true;
      state.loadHashtagPostsDone = false;
      state.loadHashtagPostsError = null;
    },
    loadSearchPostsSuccess(state, action) {
      state.loadHashtagPostsLoading = false;
      state.loadHashtagPostsDone = true;
      state.searchPosts = action.payload.data;
    },
    loadSearchPostsFailure(state, action) {
      state.loadHashtagPostsLoading = false;
      state.loadHashtagPostsError = action.payload.error;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
