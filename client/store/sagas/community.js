import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import { communityActions } from "../reducers/community";

// const serverUrl = "http://127.0.0.1:3000";
const serverUrl = "http://api.petmate.kr";

//글 작성
function postAPI(data) {
  return axios.post(`${serverUrl}/community`, data, {
    withCredentials: true,
  });
}

function* post(action) {
  try {
    const { data } = yield call(postAPI, action.payload);
    yield put(communityActions.addPostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(communityActions.addPostFailure({ data: err.response.data }));
  }
}

//글 불러오기
function loadPostsAPI(data) {
  return axios.get(`${serverUrl}/community?orderBy=${data}`);
}

function* loadPosts(action) {
  try {
    const { data } = yield call(loadPostsAPI, action.payload);
    yield put(communityActions.loadPostsSuccess(data));
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put(communityActions.loadPostsFailure({ data: err.response.data }));
  }
}

//디테일 페이지
function loadPostDetailAPI(data) {
  return axios.get(`${serverUrl}/community/${data}`);
}

function* loadPostDetail(action) {
  try {
    const { data } = yield call(loadPostDetailAPI, action.payload);
    yield put(communityActions.loadPostDetailSuccess(data));
    //console.log(payload);
  } catch (err) {
    console.error(err);
    yield put(communityActions.loadPostDetailFailure(err.response.data));
  }
}

//글 더 불러오기
function loadMoreAPI(data) {
  return axios.get(
    `${serverUrl}/community?offset=${data.offset}&count=10&orderBy=${data.orderBy}`,
    data
  );
}

function* loadMorePosts(action) {
  try {
    const { data } = yield call(loadMoreAPI, action.payload);
    yield put(communityActions.loadMoreSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(communityActions.loadMoreFailure({ data: err.response.data }));
  }
}

//글 삭제하기
function removePostAPI(data) {
  return axios.delete(`${serverUrl}/community/${data}`, {
    withCredentials: true,
  });
}

function* removePost(action) {
  try {
    const { data } = yield call(removePostAPI, action.payload);
    yield put(communityActions.removePostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(communityActions.removePostFailure(err.response.data));
  }
}

//댓글 작성
function addCommentAPI(data) {
  return axios.post(`${serverUrl}/community/${data.postId}/comment`, data, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const { data } = yield call(addCommentAPI, action.payload);
    yield put(communityActions.addCommentSuccess(data));
    console.log("댓글데이터", data);
  } catch (err) {
    console.error(err);
    yield put(communityActions.addCommentFailure(err.response.data));
  }
}

//댓글 삭제
function removeCommentAPI(data) {
  return axios.delete(`${serverUrl}/community/comment/${data}`, {
    withCredentials: true,
  });
}

function* removeComment(action) {
  try {
    const { data } = yield call(removeCommentAPI, action.payload);
    yield put(communityActions.removeCommentSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(communityActions.removeCommentFailure(err.response.data));
  }
}

//게시글 좋아요
function likePostAPI(data) {
  return axios.get(`${serverUrl}/community/${data}/like`, {
    withCredentials: true,
  });
}

function* likePost(action) {
  try {
    const { data } = yield call(likePostAPI, action.payload);
    yield put(communityActions.likePostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(communityActions.likePostFailure(err.response.data));
  }
}

//댓글 좋아요
function likeCommentAPI(data) {
  return axios.get(`${serverUrl}/community/comment/${data}/like`, {
    withCredentials: true,
  });
}

function* likeComment(action) {
  try {
    const { data } = yield call(likeCommentAPI, action.payload);
    yield put(communityActions.likeCommentSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(communityActions.likeCommentFailure(err.response.data));
  }
}

//글 수정하기
function updatePostAPI(data) {
  return axios.patch(`${serverUrl}/community/${data.id}`, data.post, {
    withCredentials: true,
  });
}

function* updatePost(action) {
  try {
    const { data } = yield call(updatePostAPI, action.payload);
    yield put(communityActions.updatePostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(communityActions.updatePostFailure(err.response.data));
  }
}

function* watchAddPost() {
  yield takeLatest(communityActions.addPostRequest, post);
}

function* watchRemovePost() {
  yield takeLatest(communityActions.removePostRequest, removePost);
}

function* watchLoadPosts() {
  yield takeLatest(communityActions.loadPostsRequest, loadPosts);
}
function* watchLoadPostDetail() {
  yield takeLatest(communityActions.loadPostDetailRequest, loadPostDetail);
}

function* watchMorePosts() {
  yield takeLatest(communityActions.loadMoreRequest, loadMorePosts);
}

function* watchAddComment() {
  yield takeLatest(communityActions.addCommentRequest, addComment);
}

function* watchRemoveComment() {
  yield takeLatest(communityActions.removeCommentRequest, removeComment);
}

function* watchLikePost() {
  yield takeLatest(communityActions.likePostRequest, likePost);
}

function* watchLikeComment() {
  yield takeLatest(communityActions.likeCommentRequest, likeComment);
}

function* watchUpdatePost() {
  yield takeLatest(communityActions.updatePostRequest, updatePost);
}

export default function* communitySaga() {
  yield all([
    fork(watchAddPost),
    fork(watchLoadPosts),
    fork(watchMorePosts),
    fork(watchLoadPostDetail),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchLikePost),
    fork(watchLikeComment),
    fork(watchUpdatePost),
  ]);
}
