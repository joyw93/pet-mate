import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
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
    console.log(action.data);
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

//글 보여주기
function loadPostsAPI(data) {
  return axios.get(`${serverUrl}/community?orderBy=old`, data, {
    withCredentials: true,
  });
}

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

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, post);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

export default function* communitySaga() {
  yield all([fork(watchAddPost), fork(watchLoadPosts)]);
}
