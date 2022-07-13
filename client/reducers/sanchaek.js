import produce from "immer";

export const initialState = {
  post: null,
  postLoading: false,
  postDone: false,
  postError: null,
};

export const POST_REQUEST = "POST_REQUEST";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_FAILURE = "POST_FAILURE";

export const POST_RESET = "POST_RESET";

export const postRequestAction = (data) => ({
  type: POST_REQUEST,
  data,
});

export const postResetAction = () => ({
  type: POST_RESET,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_REQUEST:
        draft.postLoading = true;
        draft.postError = null;
        draft.postDone = false;
        break;
      case POST_SUCCESS:
        draft.postLoading = false;
        draft.postDone = true;
        break;
      case POST_FAILURE:
        draft.postLoading = false;
        draft.postError = action.error;
        break;
      case POST_RESET:
        draft.postDone = false;

      default:
        break;
    }
  });

export default reducer;
