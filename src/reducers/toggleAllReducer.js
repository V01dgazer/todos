import { ADD_TODO, TOGGLE_TODO, TOGGLE_ALL_TODOS } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case ADD_TODO:
    case TOGGLE_TODO:
      return false;
    case TOGGLE_ALL_TODOS:
      return !state;
    default:
      return state;
  }
};
