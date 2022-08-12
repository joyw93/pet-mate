import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import community from "./community";
import search from "./search";
import sanchaek from './sanchaek';

// (이전상태, 액션) => 다음상태
// const rootReducer = combineReducers({
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         return {
//           ...state,
//           ...action.payload,
//         };
//       default:
//         return state;
//     }
//   },
//   user,
//   community,
//   sanchaek,
//   search,
//   sanchaek,
// });

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return combineReducers({
        user,
        community,
        sanchaek,
        search,
        sanchaek,
      })(state, action);
  }
}

export default rootReducer;
