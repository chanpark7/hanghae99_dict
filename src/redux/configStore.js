import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import dict from "./modules/dict";
import thunk from "redux-thunk";

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({ dict });

const store = createStore(rootReducer, enhancer);

export default store;