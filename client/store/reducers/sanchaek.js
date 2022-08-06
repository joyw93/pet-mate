import produce from "immer";

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

export const SANCHAEK_LOAD_POST_DETAIL_REQUEST =
  "SANCHAEK_LOAD_POST_DETAIL_REQUEST";
export const SANCHAEK_LOAD_POST_DETAIL_SUCCESS =
  "SANCHAEK_LOAD_POST_DETAIL_SUCCESS";
export const SANCHAEK_LOAD_POST_DETAIL_FAILURE =
  "SANCHAEK_LOAD_POST_DETAIL_FAILURE";
export const SANCHAEK_LOAD_POST_DETAIL_RESET =
  "SANCHAEK_LOAD_POST_DETAIL_RESET";

export const SANCHAEK_LOAD_POSTS_REQUEST = "SANCHAEK_LOAD_POSTS_REQUEST";
export const SANCHAEK_LOAD_POSTS_SUCCESS = "SANCHAEK_LOAD_POSTS_SUCCESS";
export const SANCHAEK_LOAD_POSTS_FAILURE = "SANCHAEK_LOAD_POSTS_FAILURE";

export const SANCHAEK_LOAD_MORE_REQUEST = "SANCHAEK_LOAD_MORE_REQUEST";
export const SANCHAEK_LOAD_MORE_SUCCESS = "SANCHAEK_LOAD_MORE_SUCCESS";
export const SANCHAEK_LOAD_MORE_FAILURE = "SANCHAEK_LOAD_MORE_FAILURE";
export const SANCHAEK_LOAD_MORE_RESET = "SANCHAEK_LOAD_MORE_RESET";

export const SANCHAEK_ADD_POST_REQUEST = "SANCHAEK_ADD_POST_REQUEST";
export const SANCHAEK_ADD_POST_SUCCESS = "SANCHAEK_ADD_POST_SUCCESS";
export const SANCHAEK_ADD_POST_FAILURE = "SANCHAEK_ADD_POST_FAILURE";
export const SANCHAEK_ADD_POST_RESET = "SANCHAEK_ADD_POST_RESET";

export const SANCHAEK_REMOVE_POST_REQUEST = "SANCHAEK_REMOVE_POST_REQUEST";
export const SANCHAEK_REMOVE_POST_SUCCESS = "SANCHAEK_REMOVE_POST_SUCCESS";
export const SANCHAEK_REMOVE_POST_FAILURE = "SANCHAEK_REMOVE_POST_FAILURE";

export const SANCHAEK_UPDATE_POST_REQUEST = "SANCHAEK_UPDATE_POST_REQUEST";
export const SANCHAEK_UPDATE_POST_SUCCESS = "SANCHAEK_UPDATE_POST_SUCCESS";
export const SANCHAEK_UPDATE_POST_FAILURE = "SANCHAEK_UPDATE_POST_FAILURE";
export const SANCHAEK_UPDATE_POST_RESET = "SANCHAEK_UPDATE_POST_RESET";

export const SANCHAEK_ADD_COMMENT_REQUEST = "SANCHAEK_ADD_COMMENT_REQUEST";
export const SANCHAEK_ADD_COMMENT_SUCCESS = "SANCHAEK_ADD_COMMENT_SUCCESS";
export const SANCHAEK_ADD_COMMENT_FAILURE = "SANCHAEK_ADD_COMMENT_FAILURE";

export const SANCHAEK_REMOVE_COMMENT_REQUEST =
  "SANCHAEK_REMOVE_COMMENT_REQUEST";
export const SANCHAEK_REMOVE_COMMENT_SUCCESS =
  "SANCHAEK_REMOVE_COMMENT_SUCCESS";
export const SANCHAEK_REMOVE_COMMENT_FAILURE =
  "SANCHAEK_REMOVE_COMMENT_FAILURE";

export const sanchaekPostRequestAction = (data) => ({
  type: SANCHAEK_ADD_POST_REQUEST,
  data,
});

export const sanchaekPostResetAction = () => ({
  type: SANCHAEK_ADD_POST_RESET,
});

export const sanchaekUpdatePostResetAction = () => ({
  type: SANCHAEK_UPDATE_POST_RESET,
});

export const sanchaekLoadPostDetailRequestAction = (data) => ({
  type: SANCHAEK_LOAD_POST_DETAIL_REQUEST,
  data,
});

export const sanchaekLoadPostDetailResetAction = () => ({
  type: SANCHAEK_LOAD_POST_DETAIL_RESET,
});

export const sanchaekLoadPostsRequestAction = () => ({
  type: SANCHAEK_LOAD_POSTS_REQUEST,
});

export const sanchaekLoadMorePostsAction = (data) => ({
  type: SANCHAEK_LOAD_MORE_REQUEST,
  data,
});

export const sanchaekLoadMoreResetAction = () => ({
  type: SANCHAEK_LOAD_MORE_RESET,
});

export const sanchaekRemovePostRequestAction = (data) => ({
  type: SANCHAEK_REMOVE_POST_REQUEST,
  data,
});

export const sanchaekUpdatePostRequestAction = (data) => ({
  type: SANCHAEK_UPDATE_POST_REQUEST,
  data,
});

export const sanchaekAddCommentRequestAction = (data) => ({
  type: SANCHAEK_ADD_COMMENT_REQUEST,
  data,
});

export const sanchaekRemoveCommentRequestAction = (data) => ({
  type: SANCHAEK_REMOVE_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //디테일 페이지
      case SANCHAEK_LOAD_POST_DETAIL_REQUEST:
        draft.sanchaekLoadPostDetailLoading = true;
        draft.sanchaekLoadPostDetailDone = false;
        draft.sanchaekLoadPostDetailError = null;
        break;
      case SANCHAEK_LOAD_POST_DETAIL_SUCCESS:
        draft.sanchaekLoadPostDetailLoading = false;
        draft.sanchaekLoadPostDetailDone = true;
        draft.sanchaekPost = action.data;
        break;
      case SANCHAEK_LOAD_POST_DETAIL_FAILURE:
        draft.sanchaekLoadPostDetailLoading = false;
        draft.sanchaekLoadPostDetailError = action.error;
        break;
      case SANCHAEK_LOAD_POST_DETAIL_RESET:
        draft.sanchaekLoadPostsLoading = false;
        draft.sanchaekPost = null;
        (draft.sanchaekLoadPostsDone = false),
          (draft.sanchaekLoadPostsError = null);
        break;

      //글 불러오기
      case SANCHAEK_LOAD_POSTS_REQUEST:
        draft.sanchaekLoadPostsLoading = true;
        draft.sanchaekLoadPostsDone = false;
        draft.sanchaekLoadPostsError = null;
        break;
      case SANCHAEK_LOAD_POSTS_SUCCESS:
        draft.sanchaekLoadPostsLoading = false;
        draft.sanchaekLoadPostsDone = true;
        draft.sanchaekPosts = action.data;
        break;
      case SANCHAEK_LOAD_POSTS_FAILURE:
        draft.sanchaekLoadPostsLoading = false;
        draft.sanchaekLoadPostsError = action.error;
        break;

      //글 더 불러오기
      case SANCHAEK_LOAD_MORE_REQUEST:
        draft.sanchaekLoadMoreLoading = true;
        draft.sanchaekLoadMoreDone = false;
        draft.sanchaekLoadMoreError = null;
        break;
      case SANCHAEK_LOAD_MORE_SUCCESS:
        draft.sanchaekLoadMoreLoading = false;
        draft.sanchaekLoadMoreDone = true;
        draft.sanchaekPosts = draft.sanchaekPosts.concat(action.data);
        draft.sanchaekMorePosts = action.data;
        break;
      case SANCHAEK_LOAD_MORE_FAILURE:
        draft.sanchaekLoadMoreLoading = false;
        draft.sanchaekLoadMoreError = action.error;
        break;
      case SANCHAEK_LOAD_MORE_RESET:
        draft.sanchaekLoadMoreDone = false;
        draft.sanchaekMorePosts = [];
        break;

      //글 추가
      case SANCHAEK_ADD_POST_REQUEST:
        draft.sanchaekAddPostLoading = true;
        draft.sanchaekAddPostError = null;
        draft.sanchaekAddPostDone = false;
        break;
      case SANCHAEK_ADD_POST_SUCCESS:
        draft.sanchaekAddPostLoading = false;
        draft.sanchaekAddPostDone = true;
        draft.sanchaekPosts.unshift(action.data);
        break;
      case SANCHAEK_ADD_POST_FAILURE:
        draft.sanchaekAddPostLoading = false;
        draft.sanchaekAddPostError = action.error;
        break;
      case SANCHAEK_ADD_POST_RESET:
        draft.sanchaekAddPostLoading = false;
        draft.sanchaekAddPostDone = false;
        draft.sanchaekAddPostError = null;
        break;

      //글 삭제
      case SANCHAEK_REMOVE_POST_REQUEST:
        draft.sanchaekRemovePostLoading = true;
        draft.sanchaekRemovePostDone = false;
        draft.sanchaekRemovePostError = null;
        break;
      case SANCHAEK_REMOVE_POST_SUCCESS:
        draft.sanchaekRemovePostLoading = false;
        draft.sanchaekRemovePostDone = true;
        break;
      case SANCHAEK_REMOVE_POST_FAILURE:
        draft.sanchaekRemovePostLoading = false;
        draft.sanchaekRemovePostError = action.error;
        break;

      //글 수정
      case SANCHAEK_UPDATE_POST_REQUEST:
        draft.sanchaekUpdatePostLoading = true;
        draft.sanchaekUpdatePostDone = false;
        draft.sanchaekUpdatePostError = null;
        break;
      case SANCHAEK_UPDATE_POST_SUCCESS:
        draft.sanchaekUpdatePostLoading = false;
        draft.sanchaekUpdatePostDone = true;
        break;
      case SANCHAEK_UPDATE_POST_FAILURE:
        draft.sanchaekUpdatePostLoading = false;
        draft.sanchaekUpdatePostError = action.error;
        break;
      case SANCHAEK_UPDATE_POST_RESET:
        draft.sanchaekUpdatePostLoading = false;
        draft.sanchaekUpdatePostDone = false;
        draft.sanchaekUpdatePostError = null;
        break;

      //댓글 추가
      case SANCHAEK_ADD_COMMENT_REQUEST:
        draft.sanchaekAddCommentLoading = true;
        draft.sanchaekAddCommentDone = false;
        draft.sanchaekAddCommentError = null;
        break;
      case SANCHAEK_ADD_COMMENT_SUCCESS:
        // draft.content.unshift(action.data.content);
        draft.sanchaekPost.comments.push(action.data);
        draft.sanchaekAddCommentLoading = false;
        draft.sanchaekAddCommentDone = true;
        break;
      case SANCHAEK_ADD_COMMENT_FAILURE:
        draft.sanchaekAddCommentLoading = false;
        draft.sanchaekAddCommentError = action.error;
        break;

      //댓글 삭제
      case SANCHAEK_REMOVE_COMMENT_REQUEST:
        draft.sanchaekRemoveCommentLoading = true;
        draft.sanchaekRemoveCommentDone = false;
        draft.sanchaekRemoveCommentError = null;
        break;
      case SANCHAEK_REMOVE_COMMENT_SUCCESS:
        draft.sanchaekPost.comments = draft.sanchaekPost.comments.filter(
          (v) => v.id !== action.data
        );
        draft.sanchaekRemoveCommentLoading = false;
        draft.sanchaekRemoveCommentDone = true;
        break;
      case SANCHAEK_REMOVE_COMMENT_FAILURE:
        draft.sanchaekRemoveCommentLoading = false;
        draft.sanchaekRemoveCommentError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
