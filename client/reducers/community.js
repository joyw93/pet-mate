import produce from "immer";

export const initialState = {
  posts: [],
  showOldPostsLoading: false,
  showOldPostsDone: false,
  showOldPostsError: null,
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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_MORE_REQUEST = "LOAD_MORE_REQUEST";
export const LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS";
export const LOAD_MORE_FAILURE = "LOAD_MORE_FAILURE";

export const SHOW_OLD_POSTS_REQUEST = "SHOW_OLD_POSTS_REQUEST";
export const SHOW_OLD_POSTS_SUCCESS = "SHOW_OLD_POSTS_SUCCESS";
export const SHOW_OLD_POSTS_FAILURE = "SHOW_OLD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const POST_RESET = "POST_RESET";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const postRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const postResetAction = () => ({
  type: POST_RESET,
});

export const loadPostsRequestAction = (data) => ({
  type: LOAD_POSTS_REQUEST,
  data,
});

export const loadMorePostsAction = () => ({
  type: LOAD_MORE_REQUEST,
});

export const showOldPostAction = () => ({
  type: SHOW_OLD_POSTS_REQUEST,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
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
        //draft.posts = action.data.concat(action.data);
        //draft.posts = draft.posts.concat(action.data);
        // draft.posts = action.data;
        //draft.posts = action.data.push(draft.posts);
        // draft.hasMorePosts = draft.posts.length < 100;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      //글 불러오기
      case SHOW_OLD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case SHOW_OLD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.posts = action.data;
        break;
      case SHOW_OLD_POSTS_FAILURE:
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
      case ADD_POST_FAILURE:
        draft.postLoading = false;
        draft.postError = action.error;
        break;
      case POST_RESET:
        draft.postDone = false;

      //글 삭제
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = state.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      //댓글 추가
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
