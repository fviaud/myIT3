import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunkMiddleware from "redux-thunk";

import * as reducers from "./reducers";

const appReducer = combineReducers(reducers);
const middlewares = [thunkMiddleware];

export const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

store.asyncReducers = {};

const createInjectReducer = (store) => (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(
        combineReducers({ ...reducers, ...store.asyncReducers })
    );
};

export const injectReducer = createInjectReducer(store);
export default store;


