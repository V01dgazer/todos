import {
  TodoActionTypes,
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS
} from "../types/action-types";

export default (state: boolean = false, action: TodoActionTypes): boolean => {
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
