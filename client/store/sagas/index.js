import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";

import userSaga from "./user";
import communitySaga from "./community";
import searchSaga from "./search";
import sanchaekSaga from "./sanchaek";

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(communitySaga),
    fork(searchSaga),
    fork(sanchaekSaga),
  ]);
}
