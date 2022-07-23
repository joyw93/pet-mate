import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE,
} from "../reducers/community";


// const serverUrl = `http://127.0.0.1:3000`;
const serverUrl = "http://api.petmate.kr";


// function postAPI(data) {
//   return axios.post(`${serverUrl}/community`, data, {
//     withCredentials: true,
//   });
// }

function postAPI(data) {
  return axios.post(
    `${serverUrl}/community`,
    { title: "aa", content: "asdf" },
    {
      withCredentials: true,
    }
  );
}

function* post(action) {
  try {
    const result = yield call(postAPI, action.data);
    console.log(action.data);
    const payload = result.data;
    yield put({
      type: POST_SUCCESS,
      data: payload.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchPost() {
  yield takeLatest(POST_REQUEST, post);
}

export default function* communitySaga() {
  yield all([fork(watchPost)]);
}
