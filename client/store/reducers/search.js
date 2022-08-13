import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchPosts: null,
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
      // console.log("포스트리듀서", state.searchPosts);
    },
    loadSearchPostsFailure(state, action) {
      state.loadHashtagPostsLoading = false;
      state.loadHashtagPostsError = action.payload.error;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
