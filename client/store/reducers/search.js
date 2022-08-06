import produce from "immer";

export const initialState = {
  searchPosts: [],
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: null,

  //   loadSearchKeywordPostsLoading: false,
  //   loadSearchKeywordPostsDone: false,
  //   loadSearchKeywordPostsError: null,
};

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const loadHashtagPostsRequestAction = (data) => ({
  type: LOAD_HASHTAG_POSTS_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //글 불러오기
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.loadHashtagPostsLoading = true;
        draft.loadHashtagPostsDone = false;
        draft.loadHashtagPostsError = null;
        break;
      case LOAD_HASHTAG_POSTS_SUCCESS:
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsDone = true;
        draft.searchPosts = action.data;
        break;
      case LOAD_HASHTAG_POSTS_FAILURE:
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsError = action.error;
        break;
    }
  });

export default reducer;
