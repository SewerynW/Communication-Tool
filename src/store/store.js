import { createStore, applyMiddleware, combineReducers } from "redux";
import { postReducer } from "../reducers/postReducers";
import thunk from "redux-thunk";

export const store = createStore(combineReducers({postReducer}), applyMiddleware(thunk));
