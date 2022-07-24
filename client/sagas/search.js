import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
} from "../reducers/search";

//const serverUrl = "http://127.0.0.1:3000";

// function postAPI(data) {
//   return axios.post(`${serverUrl}/community`, data, {
//     withCredentials: true,
//   });
// }


//const serverUrl = "http://127.0.0.1:3000";
const serverUrl = "http://api.petmate.kr";

//글 불러오기
function loadHashtagPostsAPI(data) {
  return axios.get(`${serverUrl}/hashtag?keyword=${data}`);
}

function* loadHashtagPosts(action) {
  try {
    console.log(action);
    const result = yield call(loadHashtagPostsAPI, action.data);
    const payload = result.data;
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* searchSaga() {
  yield all([fork(watchLoadHashtagPosts)]);
}
