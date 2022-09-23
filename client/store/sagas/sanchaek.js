import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import { sanchaekActions } from "../reducers/sanchaek";

// const serverUrl = "http://127.0.0.1:3000";
const serverUrl = "http://api.petmate.kr";

//글 작성
function postAPI(data) {
  return axios.post(`${serverUrl}/sanchaek`, data, {
    withCredentials: true,
  });
}

function* post(action) {
  try {
    const { data } = yield call(postAPI, action.payload);
    yield put(sanchaekActions.sanchaekAddPostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekAddPostFailure(err.response.data));
  }
}

//글 불러오기
function loadPostsAPI() {
  return axios.get(`${serverUrl}/sanchaek`);
}

function* loadPosts(action) {
  try {
    const { data } = yield call(loadPostsAPI, action.payload);
    yield put(sanchaekActions.sanchaekLoadPostsSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekLoadPostsFailure(err.response.data));
  }
}

//디테일 페이지
function loadPostDetailAPI(data) {
  return axios.get(`${serverUrl}/sanchaek/${data}`);
}

function* loadPostDetail(action) {
  try {
    const { data } = yield call(loadPostDetailAPI, action.payload);
    yield put(sanchaekActions.sanchaekLoadPostDetailSuccess(data));
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekLoadPostDetailFailure(err.response.data));
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
    const { data } = yield call(loadMoreAPI, action.payload);
    yield put(sanchaekActions.sanchaekLoadMoreSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekLoadMoreFailure(err.response.data));
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
    const { data } = yield call(removePostAPI, action.payload);
    yield put(sanchaekActions.sanchaekRemovePostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekRemovePostFailure(err.response.data));
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
    const { data } = yield call(updatePostAPI, action.payload);
    yield put(sanchaekActions.sanchaekUpdatePostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekUpdatePostFailure(err.response.data));
  }
}

//댓글 추가
function addCommentAPI(data) {
  return axios.post(`${serverUrl}/sanchaek/${data.postId}/comment`, data, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const { data } = yield call(addCommentAPI, action.payload);
    yield put(sanchaekActions.sanchaekAddCommentSuccess(data));
    console.log("산책댓글", data);
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekAddCommentFailure(err.response.data));
  }
}

//댓글 삭제
function removeCommentAPI(data) {
  return axios.delete(`${serverUrl}/sanchaek/comment/${data}`, {
    withCredentials: true,
  });
}

function* removeComment(action) {
  try {
    const { data } = yield call(removeCommentAPI, action.payload);
    console.log("payload.data", data);
    console.log("action.data", action.data);
    yield put(sanchaekActions.sanchaekRemoveCommentSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.sanchaekRemoveCommentFailure(err.response.data));
  }
}

// 좋아요
function likePostAPI(data) {
  return axios.get(`${serverUrl}/sanchaek/${data}/like`, {
    withCredentials: true,
  });
}

function* likePost(action) {
  try {
    const { data } = yield call(likePostAPI, action.payload);
    yield put(sanchaekActions.likePostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(sanchaekActions.likePostFailure(err.response.data));
  }
}


function* watchAddPost() {
  yield takeLatest(sanchaekActions.sanchaekAddPostRequest, post);
}

function* watchLoadPosts() {
  yield takeLatest(sanchaekActions.sanchaekLoadPostsRequest, loadPosts);
}

function* watchLoadPostDetail() {
  yield takeLatest(
    sanchaekActions.sanchaekLoadPostDetailRequest,
    loadPostDetail
  );
}

function* watchRemovePost() {
  yield takeLatest(sanchaekActions.sanchaekRemovePostRequest, removePost);
}

function* watchUpdatePost() {
  yield takeLatest(sanchaekActions.sanchaekUpdatePostRequest, updatePost);
}

function* watchMorePosts() {
  yield takeLatest(sanchaekActions.sanchaekLoadMoreRequest, loadMorePosts);
}

function* watchAddComment() {
  yield takeLatest(sanchaekActions.sanchaekAddCommentRequest, addComment);
}

function* watchRemoveComment() {
  yield takeLatest(sanchaekActions.sanchaekRemoveCommentRequest, removeComment);
}

function* watchLikePost() {
  yield takeLatest(sanchaekActions.likePostRequest, likePost);
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
    fork(watchLikePost)
  ]);
}
