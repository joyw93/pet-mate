import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import { searchActions } from "../reducers/search";

// const serverUrl = "http://127.0.0.1:3000";
const serverUrl = "http://api.petmate.kr";

//해시태그 글 불러오기
function loadHashtagPostsAPI(data) {
  return axios.get(`${serverUrl}/hashtag?keyword=${data}`);
}

function* loadHashtagPosts(action) {
  try {
    console.log(action);
    const { data } = yield call(loadHashtagPostsAPI, action.payload);
    yield put(searchActions.loadHashtagPostsSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(searchActions.loadHashtagPostsFailure(err.response.data));
  }
}

//검색어 글 불러오기
function loadSearchPostsAPI(data) {
  return axios.get(`${serverUrl}/index?qeury=${data}`);
}

function* loadSearchPosts(action) {
  try {
    console.log(action);
    const { data } = yield call(loadSearchPostsAPI, action.payload);
    yield put(searchActions.loadSearchPostsSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(searchActions.loadSearchPostsFailure(err.response.data));
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(searchActions.loadHashtagPostsRequest, loadHashtagPosts);
}

function* watchLoadSearchPosts() {
  yield takeLatest(searchActions.loadSearchPostsRequest, loadSearchPosts);
}

export default function* searchSaga() {
  yield all([fork(watchLoadHashtagPosts), fork(watchLoadSearchPosts)]);
}
