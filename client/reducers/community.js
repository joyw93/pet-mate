import produce from "immer";

export const initialState = {
  posts: [],
  content: [],
  commentId: [],
  post: null,
  hasMorePosts: true,
  editing: false,
  loadPostDetailLoading: false,
  loadPostDetailDone: false,
  loadPostDetailError: null,

  hasMorePosts: true,
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

export const LOAD_POST_DETAIL_REQUEST = "LOAD_POST_DETAIL_REQUEST";
export const LOAD_POST_DETAIL_SUCCESS = "LOAD_POST_DETAIL_SUCCESS";
export const LOAD_POST_DETAIL_FAILURE = "LOAD_POST_DETAIL_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_MORE_REQUEST = "LOAD_MORE_REQUEST";
export const LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS";
export const LOAD_MORE_FAILURE = "LOAD_MORE_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const POST_RESET = "POST_RESET";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const postRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const postResetAction = () => ({
  type: POST_RESET,
});

export const loadPostDetailRequestAction = (data) => ({
  type: LOAD_POST_DETAIL_REQUEST,
  data,
});

export const loadPostsRequestAction = (data) => ({
  type: LOAD_POSTS_REQUEST,
  data,
});

export const loadMorePostsAction = (data) => ({
  type: LOAD_MORE_REQUEST,
  data,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
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

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //디테일 페이지
      case LOAD_POST_DETAIL_REQUEST:
        draft.loadPostDetailLoading = true;
        draft.loadPostDetailDone = false;
        draft.loadPostDetailError = null;
        break;
      case LOAD_POST_DETAIL_SUCCESS:
        draft.loadPostDetailLoading = false;
        draft.loadPostDetailDone = true;
        draft.post = action.data;
        break;
      case LOAD_POST_DETAIL_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      //글 보여주기

      //글 불러오기
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.posts = action.data;
        // draft.hasMorePosts = draft.posts.length < 100;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      //글 더 불러오기
      case LOAD_MORE_REQUEST:
        draft.loadMoreLoading = true;
        draft.loadMoreDone = false;
        draft.loadMoreError = null;
        break;
      case LOAD_MORE_SUCCESS:
        draft.loadMoreLoading = false;
        draft.loadMoreDone = true;
        draft.posts = draft.posts.concat(action.data);
        break;
      case LOAD_MORE_FAILURE:
        draft.loadMoreLoading = false;
        draft.loadMoreError = action.error;
        break;

      //글 추가
      case ADD_POST_REQUEST:
        draft.postLoading = true;
        draft.postError = null;
        draft.postDone = false;
        break;
      case ADD_POST_SUCCESS:
        draft.postLoading = false;
        draft.postDone = true;
        draft.posts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.postLoading = false;
        draft.postError = action.error;
        break;
      case POST_RESET:
        draft.postDone = false;
        break;

      //글 삭제
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
<<<<<<< HEAD
        //draft.posts = state.posts.filter((v) => v.id !== action.data);
=======
        draft.posts = state.posts.filter((v) => v.id !== action.data);
>>>>>>> 17030fdacb447d4e0a2f680142c8851029f9ff8d
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      //글 수정
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.posts.find((v) => v.id === action.data.PostId).content =
          action.data.content;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;

      //댓글 추가
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
<<<<<<< HEAD
=======
        draft.content.unshift(action.data.content);
>>>>>>> 17030fdacb447d4e0a2f680142c8851029f9ff8d
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      //댓글 삭제
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS:
        // draft.posts.comments = state.posts.comments.filter((v) => v.comment.id !== action.data);
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;

      //좋아요
      case LIKE_POST_REQUEST:
        draft.postLoading = true;
        draft.postError = null;
        draft.postDone = false;
        break;
      case LIKE_POST_SUCCESS:
        draft.postLoading = false;
        draft.postDone = true;
        break;
      case LIKE_POST_FAILURE:
        draft.postLoading = false;
        draft.postError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
