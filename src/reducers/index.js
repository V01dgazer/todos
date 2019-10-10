import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import filterReducer from "./filterReducer";
import toggleAllReducer from "./toggleAllReducer";

export default combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  toggleAll: toggleAllReducer
});
