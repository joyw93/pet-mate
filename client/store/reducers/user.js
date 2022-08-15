import { createSlice } from "@reduxjs/toolkit";

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

  setProfileLoading: false,
  setProfileDone: false,
  setProfileError: null,

  editProfileLoading: false,
  editProfileDone: false,
  editProfileError: null,

  editAccountLoading: false,
  editAccountDone: false,
  editAccountError: null,

  loadProfileLoading: false,
  loadProfileDone: false,
  loadProfileError: null,

  loadMyProfileLoading: false,
  loadMyProfileDone: false,
  loadMyProfileError: null,

  loadUserInfoLoading: false,
  loadUserInfoDone: false,
  loadUserInfoError: null,

  me: null,

  userInfo: null, // SNS로그인 전용
  user: null,
  signUpData: {},
  loginData: {},

  loadMyPostsLoading: false,
  loadMyPostsDone: false,
  loadMyPostsError: null,

  loadMyCommentsLoading: false,
  loadMyCommentsDone: false,
  loadMyCommentsError: null,

  loadMyLikedLoading: false,
  loadMyLikedDone: false,
  loadMyLikedError: null,

  myPostsData: [],
  myCommentsData: [],
  myLikedData: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //signup
    signUpRequest(state, action) {
      state.signUpLoading = true;
      state.signUpError = null;
      state.signUpDone = false;
    },
    signUpSuccess(state, action) {
      state.signUpLoading = false;
      state.signUpDone = true;
    },
    signUpFailure(state, action) {
      state.signUpLoading = false;
      state.signUpError = action.payload.error;
    },
    signUpReset(state, action) {
      state.signUpDone = false;
    },
    //signout
    signOutRequest(state, action) {
      state.signOutLoading = true;
      state.signOutError = null;
      state.signOutDone = false;
    },
    signOutSuccess(state, action) {
      state.signOutLoading = false;
      state.logOutDone = true;
      state.me = null;
      state.signOutDone = true;
    },
    signOutFailure(state, action) {
      state.signOutLoading = false;
      state.signOutError = action.payload.error;
    },
    signOutReset(state, action) {
      state.signOutDone = false;
    },
    //signin
    logInRequest(state, action) {
      state.logInLoading = true;
      state.logInError = null;
      state.logInDone = false;
    },
    logInSuccess(state, action) {
      state.logInLoading = false;
      state.me = action.payload.data.data;
      state.logInDone = true;
    },
    logInFailure(state, action) {
      state.logInLoading = false;
      state.logInError = action.payload.error;
    },
    logInReset(state, action) {
      state.logInDone = false;
      state.logInLoading = false;
      state.logInError = null;
    },
    //logout
    logOutRequest(state, action) {
      state.logOutLoading = true;
      state.logOutError = null;
      state.logOutDone = false;
    },
    logOutSuccess(state, action) {
      state.logOutLoading = false;
      state.logOutDone = true;
      state.me = null;
    },
    logOutFailure(state, action) {
      state.logOutLoading = false;
      state.logOutError = action.payload.error;
    },
    logOutReset(state, action) {
      state.logOutDone = false;
      state.logOutLoading = false;
      state.logOutError = null;
    },
    //내 프로필 조회
    loadMyProfileRequest(state, action) {
      state.loadMyProfileLoading = true;
      state.loadMyProfileError = null;
      state.loadMyProfileDone = false;
    },
    loadMyProfileSuccess(state, action) {
      state.loadMyProfileLoading = false;
      state.loadMyProfileDone = true;
      state.me = action.payload;
      // state.me = action.payload.data;
    },
    loadMyProfileFailure(state, action) {
      state.loadMyProfileLoading = false;
      state.loadMyProfileError = action.payload.error;
    },
    //프로필 조회 다른사람 정보 불러오기
    loadProfileRequest(state, action) {
      state.loadProfileLoading = true;
      state.loadProfileError = null;
      state.loadProfileDone = false;
    },
    loadProfileSuccess(state, action) {
      state.loadProfileLoading = false;
      state.loadProfileDone = true;
      state.user = action.data;
    },
    loadProfileFailure(state, action) {
      state.loadProfileLoading = false;
      state.loadProfileError = action.payload.error;
    },
    //유저 인포 sns전용
    loadUserInfoRequest(state, action) {
      state.loadUserInfoLoading = true;
      state.loadUserInfoError = null;
      state.loadUserInfoDone = false;
    },
    loadUserInfoSuccess(state, action) {
      state.loadUserInfoLoading = false;
      state.loadUserInfoDone = true;
      state.userInfo = action.payload.data;
    },
    loadUserInfoFailure(state, action) {
      state.loadUserInfoLoading = false;
      state.loadUserInfoError = action.payload.error;
    },
    //내가 쓴 게시글
    loadMyPostsRequest(state, action) {
      state.loadMyPostsLoading = true;
      state.loadMyPostsError = null;
      state.loadMyPostsDone = false;
    },
    loadMyPostsSuccess(state, action) {
      state.loadMyPostsLoading = false;
      state.loadMyPostsDone = true;
      state.myPostsData = action.payload.data;
    },
    loadMyPostsFailure(state, action) {
      state.loadMyPostsLoading = false;
      state.loadMyPostsError = action.payload.error;
    },
    //내가 쓴 댓글
    loadMyCommentsRequest(state, action) {
      state.loadMyCommentsLoading = true;
      state.loadMyCommentsError = null;
      state.loadMyCommentsDone = false;
    },
    loadMyCommentsSuccess(state, action) {
      state.loadMyCommentsLoading = false;
      state.loadMyCommentsDone = true;
      state.myCommentsData = action.payload.data;
    },
    loadMyCommentsFailure(state, action) {
      state.loadMyCommentsLoading = false;
      state.loadMyCommentsError = action.payload.error;
    },
    //좋아요
    loadMyLikedRequest(state, action) {
      state.loadMyLikedLoading = true;
      state.loadMyLikedError = null;
      state.loadMyLikedDone = false;
    },
    loadMyLikedSuccess(state, action) {
      state.loadMyLikedLoading = false;
      state.loadMyLikedDone = true;
      state.myLikedData = action.payload.data;
    },
    loadMyLikedFailure(state, action) {
      state.loadMyLikedLoading = false;
      state.loadMyLikedError = action.payload.error;
    },
    //프로필 set
    setProfileRequest(state, action) {
      state.setProfileLoading = true;
      state.setProfileError = null;
      state.setProfileDone = false;
    },
    setProfileSuccess(state, action) {
      state.setProfileLoading = false;
      state.setProfileDone = true;
    },
    setProfileFailure(state, action) {
      state.setProfileLoading = false;
      state.setProfileError = action.payload.error;
    },
    setProfileReset(state, action) {
      state.setProfileLoading = false;
      state.setProfileDone = false;
    },
    //프로필 수정
    editProfileRequest(state, action) {
      state.editProfileLoading = true;
      state.editProfileError = null;
      state.editProfileDone = false;
    },
    editProfileSuccess(state, action) {
      state.editProfileLoading = false;
      state.editProfileDone = true;
    },
    editProfileFailure(state, action) {
      state.editProfileLoading = false;
      state.editProfileError = action.payload.error;
    },
    editProfileReset(state, action) {
      state.editProfileLoading = false;
      state.editProfileDone = false;
    },
    //계정 수정
    editAccountRequest(state, action) {
      state.editAccountLoading = true;
      state.editAccountError = null;
      state.editAccountDone = false;
    },
    editAccountSuccess(state, action) {
      state.editAccountLoading = false;
      state.editAccountDone = true;
    },
    editAccountFailure(state, action) {
      state.editAccountLoading = false;
      state.editAccountError = action.payload.error;
    },
    editAccountReset(state, action) {
      state.editAccountLoading = false;
      state.editAccountDone = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
