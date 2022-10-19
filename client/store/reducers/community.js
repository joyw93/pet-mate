import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  posts: [],
  //content: [],
  commentId: null,
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

  likeCommentLoading: false,
  likeCommentDone: false,
  likeCommentError: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    //디테일 페이지
    loadPostDetailRequest(state, action) {
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
    loadPostDetailReset(state, action) {
      state.loadPostsLoading = false;
      state.post = null;
      state.loadPostsDone = false;
      state.loadPostsError = null;
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
    loadMoreReset(state, action) {
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
      state.post.comments.push(action.payload.data);
      console.log("added", action.payload.data);
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
    //댓글 좋아요
    likeCommentRequest(state, action) {
      state.likeCommentLoading = true;
      state.likeCommentError = null;
      state.likeCommentDone = false;
      state.commentId = action.payload;
    },
    likeCommentSuccess(state, action) {
      state.post.comments.map((v) => {
        if (v.id === state.commentId) {
          v.commentLikeCount =
            action.payload.data === "like"
              ? parseInt(v.commentLikeCount) + 1
              : parseInt(v.commentLikeCount) - 1;
        }
      });
      state.likeCommentLoading = false;
      state.likeCommentError = null;
      state.likeCommentDone = true;
    },
    likeCommentFailure(state, action) {
      state.likeCommentLoading = false;
      state.likeCommentError = action.payload.error;
    },
    likeCommentReset(state, action) {
      state.likeCommentDone = false;
    },
  },
});

export const communityActions = communitySlice.actions;
export default communitySlice.reducer;
