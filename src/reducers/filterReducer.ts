import { FILTER_TODOS, TodoActionTypes } from "../types/action-types";

export default (
  state: string = "SHOW_ALL",
  action: TodoActionTypes
): string => {
  switch (action.type) {
    case FILTER_TODOS:
      return action.filter;
    default:
      return state;
  }
};
