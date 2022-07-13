import produce from "immer";

export const initialState = {
  post: null,
  postLoading: false,
  postDone: false,
  postError: null,
  mainPosts: [
    {
      id: 1,
      title: "post title",
      content: "post content",
      createdAt: "2022-07-11T00:33:58.241Z",
      author: {
        nickname: "user nickname",
      },
      images: [
        {
          url: "https://image.png",
        },
      ],
      tags: [
        {
          id: 1,
          hashtag: {
            keyword: "hashtag keyword",
          },
        },
      ],
      comments: [
        {
          id: 1,
          content: "댓글내용",
          createdAt: "시간",
          author: { id: 1, nickname: "용용" },
        },
      ],
    },
  ],
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
