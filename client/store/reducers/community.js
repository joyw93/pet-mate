import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const initialState = {
  posts: [],
  //content: [],
  commentId: [],
  post: null, // post = {...post, comments:[...comments, '새로운댓글']}
  morePosts: null,

  editing: false,

  loadPostDetailLoading: false,
  loadPostDetailDone: false,
  loadPostDetailError: null,

  loadMoreLoading: false,
  loadMoreDone: false,
  loadMoreError: null,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    //디테일 페이지
    loadPostsDetailRequest(state, action) {
      state.loadPostDetailLoading = true;
      state.loadPostDetailDone = false;
      state.loadPostDetailError = null;
    },
    loadPostDetailSuccess(state, action) {
      state.loadPostDetailLoading = false;
      state.loadPostDetailDone = true;
      state.post = action.payload.data;
    },
    loadPostDetailFailure(state, action) {
      state.loadPostDetailLoading = false;
      state.loadPostDetailError = action.payload.error;
    },
    //글 불러오기
    loadPostsRequest(state, action) {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = null;
    },
    loadPostsSuccess(state, action) {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.posts = action.payload.data;
    },
    loadPostsFailure(state, action) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload.error;
    },
    //글 더 불러오기
    loadMoreRequest(state, action) {
      state.loadMoreLoading = true;
      state.loadMoreDone = false;
      state.loadMoreError = null;
    },
    loadMoreSuccess(state, action) {
      state.loadMoreLoading = false;
      state.loadMoreDone = true;
      state.posts = state.posts.concat(action.payload.data);
      state.morePosts = action.payload.data;
    },
    loadMoreFailure(state, action) {
      state.loadMoreLoading = false;
      state.loadMoreError = action.payload.error;
    },
    loadMoreRest(state, action) {
      state.loadMoreDone = false;
      state.morePosts = [];
    },
    //  글 추가
    addPostRequest(state, action) {
      state.addPostLoading = true;
      state.addPostError = null;
      state.addPostDone = false;
    },
    addPostSuccess(state, action) {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.posts.unshift(action.payload.data);
    },
    addPostFailure(state, action) {
      state.addPostLoading = false;
      state.addPostError = action.payload.error;
    },
    addPostReset(state, action) {
      state.addPostLoading = false;
      state.addPostDone = false;
      state.addPostError = null;
    },
    //글 삭제
    removePostRequest(state, action) {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.removePostError = null;
    },
    removePostSuccess(state, action) {
      state.removePostLoading = false;
      state.removePostDone = true;
    },
    removePostFailure(state, action) {
      state.removePostLoading = false;
      state.removePostError = action.payload.error;
    },
    //글 수정
    updatePostRequest(state, action) {
      state.updatePostLoading = true;
      state.updatePostDone = false;
      state.updatePostError = null;
    },
    updatePostSuccess(state, action) {
      state.updatePostLoading = false;
      state.updatePostDone = true;
    },
    updatePostFailure(state, action) {
      state.updatePostLoading = false;
      state.updatePostError = action.payload.error;
    },
    updatePostReset(state, action) {
      state.updatePostLoading = false;
      state.updatePostDone = false;
      state.updatePostError = null;
    },
    //댓글 추가
    addCommentRequest(state, action) {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSuccess(state, action) {
      state.post.comments.push(action.data);
      state.addCommentLoading = false;
      state.addCommentDone = true;
    },
    addCommentFailure(state, action) {
      state.addCommentLoading = false;
      state.addCommentError = action.payload.error;
    },

    //댓글 삭제
    removeCommentRequest(state, action) {
      state.removeCommentLoading = true;
      state.removeCommentDone = false;
      state.removeCommentError = null;
    },
    removeCommentSuccess(state, action) {
      state.post.comments = state.post.comments.filter(
        (v) => v.id !== action.payload.data
      );
      state.removeCommentLoading = false;
      state.removeCommentDone = true;
    },
    removeCommentFailure(state, action) {
      state.removeCommentLoading = false;
      state.removeCommentError = action.payload.error;
    },
    //좋아요
    likePostRequest(state, action) {
      state.likePostLoading = true;
      state.likePostError = null;
      state.likePostDone = false;
    },
    likePostSuccess(state, action) {
      state.post.likeCount =
        action.payload.data === "like"
          ? state.post.likeCount + 1
          : state.post.likeCount - 1;
      state.likePostLoading = false;
      state.likePostError = null;
      state.likePostDone = true;
    },
    likePostFailure(state, action) {
      state.likePostLoading = false;
      state.likePostError = action.payload.error;
    },
    likePostReset(state, action) {
      state.likePostDone = false;
    },
  },
});

export const communityActions = communitySlice.actions;
export default communitySlice.reducer;

export const LOAD_POST_DETAIL_REQUEST = "LOAD_POST_DETAIL_REQUEST";
export const LOAD_POST_DETAIL_SUCCESS = "LOAD_POST_DETAIL_SUCCESS";
export const LOAD_POST_DETAIL_FAILURE = "LOAD_POST_DETAIL_FAILURE";
export const LOAD_POST_DETAIL_RESET = "LOAD_POST_DETAIL_RESET";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_MORE_REQUEST = "LOAD_MORE_REQUEST";
export const LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS";
export const LOAD_MORE_FAILURE = "LOAD_MORE_FAILURE";
export const LOAD_MORE_RESET = "LOAD_MORE_RESET";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const ADD_POST_RESET = "ADD_POST_RESET";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";
export const UPDATE_POST_RESET = "UPDATE_POST_RESET";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";
export const LIKE_POST_RESET = "LIKE_RESET";

export const postRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const postResetAction = () => ({
  type: ADD_POST_RESET,
});

export const updatePostResetAction = () => ({
  type: UPDATE_POST_RESET,
});

export const loadPostDetailRequestAction = (data) => ({
  type: LOAD_POST_DETAIL_REQUEST,
  data,
});

export const loadPostDetailResetAction = () => ({
  type: LOAD_POST_DETAIL_RESET,
});

export const loadPostsRequestAction = (data) => ({
  type: LOAD_POSTS_REQUEST,
  data,
});

export const loadMorePostsAction = (data) => ({
  type: LOAD_MORE_REQUEST,
  data,
});

export const loadMoreResetAction = () => ({
  type: LOAD_MORE_RESET,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const updatePostRequestAction = (data) => ({
  type: UPDATE_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const removeCommentRequestAction = (data) => ({
  type: REMOVE_COMMENT_REQUEST,
  data,
});

export const likePostRequestAction = (data) => ({
  type: LIKE_POST_REQUEST,
  data,
});
export const likeResetAction = () => ({
  type: LIKE_POST_RESET,
});
