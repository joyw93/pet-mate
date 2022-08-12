import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  sanchaekPosts: [],
  sanchaekCommentId: [],
  sanchaekPost: null,
  sanchaekMorePosts: null,

  editing: false,

  sanchaekLoadPostDetailLoading: false,
  sanchaekLoadPostDetailDone: false,
  sanchaekLoadPostDetailError: null,

  sanchaekLoadMoreLoading: false,
  sanchaekLoadMoreDone: false,
  sanchaekLoadMoreError: null,

  sanchaekLoadPostsLoading: false,
  sanchaekLoadPostsDone: false,
  sanchaekLoadPostsError: null,

  sanchaekAddPostLoading: false,
  sanchaekAddPostDone: false,
  sanchaekAddPostError: null,

  sanchaekUpdatePostLoading: false,
  sanchaekUpdatePostDone: false,
  sanchaekUpdatePostError: null,

  sanchaekRemovePostLoading: false,
  sanchaekRemovePostDone: false,
  sanchaekRemovePostError: null,

  sanchaekAddCommentLoading: false,
  sanchaekAddCommentDone: false,
  sanchaekAddCommentError: null,

  sanchaekRemoveCommentLoading: false,
  sanchaekRemoveCommentDone: false,
  sanchaekRemoveCommentError: null,
};

const sanchaekSlice = createSlice({
  name: "sanchaek",
  initialState,
  reducers: {
    //디테일 페이지
    sanchaekLoadPostDetailRequest(state, action) {
      state.sanchaekLoadPostDetailLoading = true;
      state.sanchaekLoadPostDetailDone = false;
      state.sanchaekLoadPostDetailError = null;
    },
    sanchaekLoadPostDetailSuccess(state, action) {
      state.sanchaekLoadPostDetailLoading = false;
      state.sanchaekLoadPostDetailDone = true;
      state.sanchaekPost = action.payload.data;
    },
    sanchaekLoadPostDetailFailure(state, action) {
      state.sanchaekLoadPostDetailLoading = false;
      state.sanchaekLoadPostDetailError = action.payload.error;
    },
    sanchaekLoadPostDetailReset(state, action) {
      state.sanchaekLoadPostsLoading = false;
      state.sanchaekPost = null;
      state.sanchaekLoadPostsDone = false;
      state.sanchaekLoadPostsError = null;
    },
    //글 불러오기
    sanchaekLoadPostsRequest(state, action) {
      state.sanchaekLoadPostsLoading = true;
      state.sanchaekLoadPostsDone = false;
      state.sanchaekLoadPostsError = null;
    },
    sanchaekLoadPostsSuccess(state, action) {
      state.sanchaekLoadPostsLoading = false;
      state.sanchaekLoadPostsDone = true;
      state.sanchaekPosts = action.payload.data;
    },
    sanchaekLoadPostsFailure(state, action) {
      state.sanchaekLoadPostsLoading = false;
      state.sanchaekLoadPostsError = action.payload.error;
    },
    //글 더 불러오기
    sanchaekLoadMoreRequest(state, action) {
      state.sanchaekLoadMoreLoading = true;
      state.sanchaekLoadMoreDone = false;
      state.sanchaekLoadMoreError = null;
    },
    sanchaekLoadMoreSuccess(state, action) {
      state.sanchaekLoadMoreLoading = false;
      state.sanchaekLoadMoreDone = true;
      state.sanchaekPosts = state.sanchaekPosts.concat(action.payload.data);
      state.sanchaekMorePosts = action.payload.data;
    },
    sanchaekLoadMoreFailure(state, action) {
      state.sanchaekLoadMoreLoading = false;
      state.sanchaekLoadMoreError = action.payload.error;
    },
    sanchaekLoadMoreReset(state, action) {
      state.sanchaekLoadMoreDone = false;
      state.sanchaekMorePosts = [];
    },
    //  글 추가
    sanchaekAddPostRequest(state, action) {
      state.sanchaekAddPostLoading = true;
      state.sanchaekAddPostError = null;
      state.sanchaekAddPostDone = false;
    },
    sanchaekAddPostSuccess(state, action) {
      state.sanchaekAddPostLoading = false;
      state.sanchaekAddPostDone = true;
      state.sanchaekPosts.unshift(action.payload.data);
    },
    sanchaekAddPostFailure(state, action) {
      state.sanchaekAddPostLoading = false;
      state.sanchaekAddPostError = action.payload.error;
    },
    sanchaekAddPostReset(state, action) {
      state.sanchaekAddPostLoading = false;
      state.sanchaekAddPostDone = false;
      state.sanchaekAddPostError = null;
    },
    //글 삭제
    sanchaekRemovePostRequest(state, action) {
      state.sanchaekRemovePostLoading = true;
      state.sanchaekRemovePostDone = false;
      state.sanchaekRemovePostError = null;
    },
    sanchaekRemovePostSuccess(state, action) {
      state.sanchaekRemovePostLoading = false;
      state.sanchaekRemovePostDone = true;
    },
    sanchaekRemovePostFailure(state, action) {
      state.sanchaekRemovePostLoading = false;
      state.sanchaekRemovePostError = action.payload.error;
    },
    //글 수정
    sanchaekUpdatePostRequest(state, action) {
      state.sanchaekUpdatePostLoading = true;
      state.sanchaekUpdatePostDone = false;
      state.sanchaekUpdatePostError = null;
    },
    sanchaekUpdatePostSuccess(state, action) {
      state.sanchaekUpdatePostLoading = false;
      state.sanchaekUpdatePostDone = true;
    },
    sanchaekUpdatePostFailure(state, action) {
      state.sanchaekUpdatePostLoading = false;
      state.sanchaekUpdatePostError = action.payload.error;
    },
    sanchaekUpdatePostReset(state, action) {
      state.sanchaekUpdatePostLoading = false;
      state.sanchaekUpdatePostDone = false;
      state.sanchaekUpdatePostError = null;
    },
    //댓글 추가
    sanchaekAddCommentRequest(state, action) {
      state.sanchaekAddCommentLoading = true;
      state.sanchaekAddCommentDone = false;
      state.sanchaekAddCommentError = null;
    },
    sanchaekAddCommentSuccess(state, action) {
      state.sanchaekPost.comments.push(action.payload.data);
      state.sanchaekAddCommentLoading = false;
      state.sanchaekAddCommentDone = true;
    },
    sanchaekAddCommentFailure(state, action) {
      state.sanchaekAddCommentLoading = false;
      state.sanchaekAddCommentError = action.payload.error;
    },
    //댓글 삭제
    sanchaekRemoveCommentRequest(state, action) {
      state.sanchaekRemoveCommentLoading = true;
      state.sanchaekRemoveCommentDone = false;
      state.sanchaekRemoveCommentError = null;
    },
    sanchaekRemoveCommentSuccess(state, action) {
      state.sanchaekPost.comments = state.sanchaekPost.comments.filter(
        (v) => v.id !== action.payload.data
      );
      state.sanchaekRemoveCommentLoading = false;
      state.sanchaekRemoveCommentDone = true;
    },
    sanchaekRemoveCommentFailure(state, action) {
      state.sanchaekRemoveCommentLoading = false;
      state.sanchaekRemoveCommentError = action.payload.error;
    },
  },
});

export const sanchaekActions = sanchaekSlice.actions;
export default sanchaekSlice.reducer;
