import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../reducers/community";

// const serverUrl = "http://api.petmate.kr";
const serverUrl = "http://127.0.0.1:3000";

// function postAPI(data) {
//   return axios.post(`${serverUrl}/community`, data, {
//     withCredentials: true,
//   });
// }

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

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, post);
}

export default function* communitySaga() {
  yield all([fork(watchAddPost)]);
}
