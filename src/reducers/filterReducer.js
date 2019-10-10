import { FILTER_TODOS } from "../actions/types";

export default (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case FILTER_TODOS:
      return action.payload;
    default:
      return state;
  }
};
