import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { userActions } from "../reducers/user";

// const serverUrl = `http://127.0.0.1:3000`;
const serverUrl = "http://api.petmate.kr";

function signUpAPI(data) {
  return axios.post(`${serverUrl}/user/signup`, data);
}

function* signUp(action) {
  try {
    const { data } = yield call(signUpAPI, action.payload);
    yield put(userActions.signUpSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.signUpFailure(err.response.data));
  }
}

function signOutAPI() {
  return axios.delete(`${serverUrl}/user/signout`, { withCredentials: true });
}

function* signOut(action) {
  try {
    const result = yield call(signOutAPI);
    const { data } = result.payload;
    yield put(userActions.signOutSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.signOutFailure(err.response.data));
  }
}

function logInAPI(data) {
  console.log("로그인api사가", data);
  return axios.post(`${serverUrl}/user/login`, data, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const { data } = yield call(logInAPI, action.payload);
    yield put(userActions.logInSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.logInFailure(err.response.data));
  }
}

function logOutAPI() {
  return axios.get(`${serverUrl}/user/logout`, { withCredentials: true });
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put(userActions.logOutSuccess());
  } catch (err) {
    console.error(err);
    yield put(userActions.logOutFailure(err.response.data));
  }
}

function loadProfileAPI(data) {
  return axios.get(`${serverUrl}/user/${data}`, { withCredentials: true });
}

function* loadProfile(action) {
  try {
    const { data } = yield call(loadProfileAPI, action.payload);
    console.log("로드프로필사가", data);
    yield put(userActions.loadProfileSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.loadProfileFailure(err.response.data));
  }
}

function loadMyProfileAPI() {
  return axios.get(`${serverUrl}/user`, { withCredentials: true });
}

function* loadMyProfile(action) {
  try {
    const { data } = yield call(loadMyProfileAPI, action.payload);
    yield put(userActions.loadMyProfileSuccess(data));
    console.log("로드마이프로필사가데이터", data);
  } catch (err) {
    console.error(err);
    yield put(userActions.loadMyProfileFailure(err.response));
  }
}

function loadUserInfoAPI() {
  return axios.get(`${serverUrl}/user`, { withCredentials: true });
}

function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI);
    const data = result.data;
    console.log(data.data);
    yield put(userActions.loadUserInfoSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.loadUserInfoFailure(err.response.data));
  }
}

function loadMyPostsAPI() {
  return axios.get(`${serverUrl}/user/posts`, { withCredentials: true });
}

function* loadMyPosts(action) {
  try {
    const { data } = yield call(loadMyPostsAPI, action.payload);
    yield put(userActions.loadMyPostsSuccess(data));
    console.log("myposts", data);
  } catch (err) {
    console.error(err);
    yield put(userActions.loadMyPostsFailure(err.response.data));
  }
}

function loadMyCommentsAPI() {
  return axios.get(`${serverUrl}/user/commented-posts`, {
    withCredentials: true,
  });
}

function* loadMyComments(action) {
  try {
    const { data } = yield call(loadMyCommentsAPI, action.payload);
    yield put(userActions.loadMyCommentsSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.loadMyCommentsFailure(err.response.data));
  }
}

function loadMyLikedAPI() {
  return axios.get(`${serverUrl}/user/liked-posts`, { withCredentials: true });
}

function* loadMyLiked(action) {
  try {
    const { data } = yield call(loadMyLikedAPI, action.payload);
    yield put(userActions.loadMyLikedSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.loadMyLikedFailure(err.response.data));
  }
}

function setProfileAPI(data) {
  return axios.post(`${serverUrl}/user/profile`, data, {
    withCredentials: true,
  });
}

function* setProfile(action) {
  try {
    const { data } = yield call(setProfileAPI, action.payload);
    yield put(userActions.setProfileSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.setProfileFailure(err.response.data));
  }
}

function editProfileAPI(data) {
  return axios.patch(`${serverUrl}/user/profile`, data, {
    withCredentials: true,
  });
}

function* editProfile(action) {
  try {
    const { data } = yield call(editProfileAPI, action.payload);
    yield put(userActions.editProfileSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.editProfileFailure(err.response.data));
  }
}

function editAccountAPI(data) {
  return axios.patch(`${serverUrl}/user/account`, data, {
    withCredentials: true,
  });
}

function* editAccount(action) {
  try {
    const { data } = yield call(editAccountAPI, action.payload);
    yield put(userActions.editAccountSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(userActions.editAccountFailure(err.response.data));
  }
}

function* watchLogIn() {
  yield takeLatest(userActions.logInRequest, logIn);
}

function* watchLogOut() {
  yield takeLatest(userActions.logOutRequest, logOut);
}

function* watchSignUp() {
  yield takeLatest(userActions.signUpRequest, signUp);
}

function* watchSignOut() {
  yield takeLatest(userActions.signOutRequest, signOut);
}

function* watchLoadProfile() {
  yield takeLatest(userActions.loadProfileRequest, loadProfile);
}

function* watchLoadMyProfile() {
  yield takeLatest(userActions.loadMyProfileRequest, loadMyProfile);
}

function* watchLoadUserInfo() {
  yield takeLatest(userActions.loadUserInfoRequest, loadUserInfo);
}

function* watchLoadMyPosts() {
  yield takeLatest(userActions.loadMyPostsRequest, loadMyPosts);
}

function* watchLoadMyComments() {
  yield takeLatest(userActions.loadMyCommentsRequest, loadMyComments);
}

function* watchLoadMyLiked() {
  yield takeLatest(userActions.loadMyLikedRequest, loadMyLiked);
}

function* watchSetProfile() {
  yield takeLatest(userActions.setProfileRequest, setProfile);
}

function* watchEditProfile() {
  yield takeLatest(userActions.editProfileRequest, editProfile);
}

function* watchEditAccount() {
  yield takeLatest(userActions.editAccountRequest, editAccount);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchSignOut),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadMyPosts),
    fork(watchLoadMyComments),
    fork(watchLoadMyLiked),
    fork(watchLoadProfile),
    fork(watchLoadUserInfo),
    fork(watchEditProfile),
    fork(watchEditAccount),
    fork(watchSetProfile),
    fork(watchLoadMyProfile),
  ]);
}
