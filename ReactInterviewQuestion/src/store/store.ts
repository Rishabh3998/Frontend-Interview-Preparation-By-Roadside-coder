import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
  // This will contain our reducers
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
