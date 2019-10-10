import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import throttle from "./throttle";
import reducers from "./reducers";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(thunk));
store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  })
);

export default store;
