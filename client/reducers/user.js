import produce from "immer";

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  signOutLoading: false, // 회원탈퇴 시도중
  signOutDone: false,
  signOutError: null,
  editProfileLoading: false,
  editProfileDone: false,
  editProfileError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const SIGN_UP_RESET = "SIGN_UP_RESET";

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";
export const SIGN_OUT_RESET = "SIGN_OUT_RESET";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILURE = "EDIT_PROFILE_FAILURE";

export const signupRequestAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const signupResetAction = () => ({
  type: SIGN_UP_RESET,
});

export const signOutRequestAction = () => ({
  type: SIGN_OUT_REQUEST,
});

export const signOutResetAction = () => ({
  type: SIGN_OUT_RESET,
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const editProfileRequestAction = (data) => ({
  type: EDIT_PROFILE_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case SIGN_OUT_REQUEST:
        draft.signOutLoading = true;
        draft.signOutError = null;
        draft.signOutDone = false;
        break;
      case SIGN_OUT_SUCCESS:
        draft.signOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        draft.signOutDone = true;
        break;
      case SIGN_OUT_FAILURE:
        draft.signOutLoading = false;
        draft.signOutError = action.error;
        break;

      case SIGN_UP_RESET:
        draft.signUpDone = false;
        break;

      case SIGN_OUT_RESET:
        draft.signOutDone = false;
        break;

      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case EDIT_PROFILE_REQUEST:
        draft.editProfileLoading = true;
        draft.editProfileError = null;
        draft.editProfileDone = false;
        break;
      case EDIT_PROFILE_SUCCESS:
        draft.editProfileLoading = false;
        draft.editProfileDone = true;
        break;
      case EDIT_PROFILE_FAILURE:
        draft.editProfileLoading = false;
        draft.editProfileError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
