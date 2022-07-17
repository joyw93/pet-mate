import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_MORE_REQUEST,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_DETAIL_REQUEST,
  LOAD_POST_DETAIL_SUCCESS,
  LOAD_POST_DETAIL_FAILURE,
  SHOW_OLD_POSTS_REQUEST,
  SHOW_OLD_POSTS_SUCCESS,
  SHOW_OLD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../reducers/community";

//const serverUrl = "http://127.0.0.1:3000";

// function postAPI(data) {
//   return axios.post(`${serverUrl}/community`, data, {
//     withCredentials: true,
//   });
// }

const serverUrl = "http://api.petmate.kr";

//글 작성
function postAPI(data) {
  return axios.post(`${serverUrl}/community`, data, {
    withCredentials: true,
  });
}

function* post(action) {
  try {
    const result = yield call(postAPI, action.data);
    const payload = result.data;
    yield put({
      type: ADD_POST_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//글 불러오기
function loadPostsAPI(data) {
  return axios.get(`${serverUrl}/community?orderBy=${data}`);
}

// function loadPostsAPI(data) {
//   return axios.post(`${serverUrl}/community?orderBy=${data}`, data, {
//     withCredentials: true,
//   });
// }

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: payload.data,
    });
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

//디테일 페이지
function loadPostDetailAPI(data) {
  return axios.get(`${serverUrl}/community/${data}`);
}

//글 더 불러오기
function loadMoreAPI(data) {
  return axios.get(`${serverUrl}/community?offset=10&count=10`, data, {
    withCredentials: true,
  });
}

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOAD_POST_DETAIL_SUCCESS,
      data: payload.data,
    });
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_DETAIL_FAILURE,
      data: err.response.data,
    });
  }
}

function* loadMorePosts(action) {
  try {
    const result = yield call(loadMoreAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOAD_MORE_SUCCESS,

      data: payload.data,
    });
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MORE_FAILURE,
      data: err.response.data,
    });
  }
}

//오래된 순
function loadOldPostsAPI(data) {
  return axios.get(`${serverUrl}/community?orderBy=old`, data, {
    withCredentials: true,
  });
}

function* loadOldPosts(action) {
  try {
    const result = yield call(loadOldPostsAPI, action.data);
    const payload = result.data;
    yield put({
      type: SHOW_OLD_POSTS_SUCCESS,
      data: payload.data,
    });
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put({
      type: SHOW_OLD_POSTS_FAILURE,

      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, post);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadPostDetail() {
  yield throttle(5000, LOAD_POST_DETAIL_REQUEST, loadPostDetail);
}

function* watchMorePosts() {
  yield throttle(5000, LOAD_MORE_REQUEST, loadMorePosts);
}

function* watchLoadOldPosts() {
  yield throttle(5000, SHOW_OLD_POSTS_REQUEST, loadOldPosts);
}

SHOW_OLD_POSTS_REQUEST;

export default function* communitySaga() {
  yield all([fork(watchAddPost), fork(watchLoadPosts), fork(watchMorePosts), fork(watchLoadOldPosts), fork(watchLoadPostDetail)]);
}
