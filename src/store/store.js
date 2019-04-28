import { createStore, applyMiddleware, combineReducers } from "redux";
import { postReducer } from "../reducers/postReducers";
import { profileReducer } from "../reducers/profileReducer";

import thunk from "redux-thunk";

const appReducer = combineReducers({postReducer, profileReducer})

export const store = createStore(appReducer, applyMiddleware(thunk));

window.store=store