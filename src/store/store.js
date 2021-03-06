import { createStore, applyMiddleware, combineReducers } from "redux";
import { postReducer } from "../reducers/postReducers";
import { profileReducer } from "../reducers/profileReducer";
import { friendsReducer } from "../reducers/friendsReducer";
import { stateReducer } from "../reducers/stateReducer";

import thunk from "redux-thunk";

const appReducer = combineReducers({
  postReducer,
  profileReducer,
  friendsReducer,
  stateReducer
});

export const store = createStore(appReducer, applyMiddleware(thunk));

window.store = store;
