import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import { searchActions } from "../reducers/search";

// const serverUrl = "http://127.0.0.1:3000";
const serverUrl = "http://api.petmate.kr";

//글 불러오기
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

function* watchLoadHashtagPosts() {
  yield takeLatest(searchActions.loadHashtagPostsRequest, loadHashtagPosts);
}

export default function* searchSaga() {
  yield all([fork(watchLoadHashtagPosts)]);
}
