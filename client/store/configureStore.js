import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import rootReducer from './reducers';
import rootSaga from "./sagas/index";
import { composeWithDevTools } from "redux-devtools-extension";

//loggerMiddleware나중에 삭제
const loggerMiddleware =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        console.log(action);
        return next(action);
      };

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = configureStore({ reducer: rootReducer, middleware: middlewares, devTools: enhancer });
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: process.env.NODE_ENV === "development",
});

const store = createStore();

export default wrapper;
