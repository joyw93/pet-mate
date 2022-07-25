import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import {
  SANCHAEK_LOAD_MORE_REQUEST,
  SANCHAEK_LOAD_MORE_SUCCESS,
  SANCHAEK_LOAD_MORE_FAILURE,
  SANCHAEK_LOAD_POSTS_REQUEST,
  SANCHAEK_LOAD_POSTS_SUCCESS,
  SANCHAEK_LOAD_POSTS_FAILURE,
  SANCHAEK_LOAD_POST_DETAIL_REQUEST,
  SANCHAEK_LOAD_POST_DETAIL_SUCCESS,
  SANCHAEK_LOAD_POST_DETAIL_FAILURE,
  SANCHAEK_ADD_POST_REQUEST,
  SANCHAEK_ADD_POST_SUCCESS,
  SANCHAEK_ADD_POST_FAILURE,
  SANCHAEK_REMOVE_POST_REQUEST,
  SANCHAEK_REMOVE_POST_SUCCESS,
  SANCHAEK_REMOVE_POST_FAILURE,
  SANCHAEK_UPDATE_POST_REQUEST,
  SANCHAEK_UPDATE_POST_SUCCESS,
  SANCHAEK_UPDATE_POST_FAILURE,
  SANCHAEK_ADD_COMMENT_REQUEST,
  SANCHAEK_ADD_COMMENT_SUCCESS,
  SANCHAEK_ADD_COMMENT_FAILURE,
  SANCHAEK_REMOVE_COMMENT_REQUEST,
  SANCHAEK_REMOVE_COMMENT_SUCCESS,
  SANCHAEK_REMOVE_COMMENT_FAILURE,
} from "../reducers/sanchaek";

// function postAPI(data) {
//   return axios.post(`${serverUrl}/community`, data, {
//     withCredentials: true,
//   });
// }

const serverUrl = "http://127.0.0.1:3000";
// const serverUrl = "http://api.petmate.kr";

//글 작성
function postAPI(data) {
  return axios.post(`${serverUrl}/sanchaek`, data, {
    withCredentials: true,
  });
}

function* post(action) {
  try {
    const result = yield call(postAPI, action.data);
    const payload = result.data;
    yield put({
      type: SANCHAEK_ADD_POST_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//글 불러오기
function loadPostsAPI() {
  return axios.get(`${serverUrl}/sanchaek`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    const payload = result.data;
    yield put({
      type: SANCHAEK_LOAD_POSTS_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

//디테일 페이지
function loadPostDetailAPI(data) {
  return axios.get(`${serverUrl}/sanchaek/${data}`);
}

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.data);
    const payload = result.data;
    yield put({
      type: SANCHAEK_LOAD_POST_DETAIL_SUCCESS,
      data: payload.data,
    });
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_LOAD_POST_DETAIL_FAILURE,
      data: err.response.data,
    });
  }
}

//글 더 불러오기
function loadMoreAPI(data) {
  return axios.get(
    `${serverUrl}/sanchaek?offset=${data.offset}&count=12`,
    data
  );
}

function* loadMorePosts(action) {
  try {
    const result = yield call(loadMoreAPI, action.data);
    const payload = result.data;
    yield put({
      type: SANCHAEK_LOAD_MORE_SUCCESS,
      data: payload.data,
    });
    console.log(payload);
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_LOAD_MORE_FAILURE,
      data: err.response.data,
    });
  }
}

//글 삭제하기
function removePostAPI(data) {
  return axios.delete(`${serverUrl}/sanchaek/${data}`, {
    withCredentials: true,
  });
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    const payload = result.data;
    yield put({
      type: SANCHAEK_REMOVE_POST_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`${serverUrl}/sanchaek/${data.postId}/comment`, data, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    const payload = result.data;
    yield put({
      type: SANCHAEK_ADD_COMMENT_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeCommentAPI(data) {
  return axios.delete(`${serverUrl}/sanchaek/comment/${data}`, {
    withCredentials: true,
  });
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    const payload = result.data;
    console.log("payload.data", payload.data);
    console.log("action.data", action.data);
    yield put({
      type: SANCHAEK_REMOVE_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

//글 수정하기
function updatePostAPI(data) {
  return axios.patch(`${serverUrl}/sanchaek/${data.id}`, data.post, {
    withCredentials: true,
  });
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    const payload = result.data;
    yield put({
      type: SANCHAEK_UPDATE_POST_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SANCHAEK_UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(SANCHAEK_ADD_POST_REQUEST, post);
}

function* watchRemovePost() {
  yield takeLatest(SANCHAEK_REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPosts() {
  yield takeLatest(SANCHAEK_LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadPostDetail() {
  yield takeLatest(SANCHAEK_LOAD_POST_DETAIL_REQUEST, loadPostDetail);
}

function* watchMorePosts() {
  yield takeLatest(SANCHAEK_LOAD_MORE_REQUEST, loadMorePosts);
}

function* watchAddComment() {
  yield takeLatest(SANCHAEK_ADD_COMMENT_REQUEST, addComment);
}

function* watchRemoveComment() {
  yield takeLatest(SANCHAEK_REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchUpdatePost() {
  yield takeLatest(SANCHAEK_UPDATE_POST_REQUEST, updatePost);
}

export default function* sanchaekSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchMorePosts),
    fork(watchLoadPostDetail),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchUpdatePost),
  ]);
}
