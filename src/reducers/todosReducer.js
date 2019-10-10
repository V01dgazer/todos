import {
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  EDIT_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
    case EDIT_TODO:
      return { ...state, [action.payload.id]: action.payload };
    case TOGGLE_TODO:
      const toggledTodo = Object.assign({}, state[action.payload]);
      toggledTodo.completed = !toggledTodo.completed;
      return { ...state, [action.payload]: toggledTodo };
    case TOGGLE_ALL_TODOS:
      const toggledTodos = JSON.parse(JSON.stringify(state));
      Object.keys(toggledTodos).forEach(
        id => (toggledTodos[id].completed = action.payload)
      );
      return toggledTodos;
    case DELETE_TODO:
      const newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    case CLEAR_COMPLETED:
      const uncompleted = JSON.parse(JSON.stringify(state));
      Object.keys(uncompleted).forEach(id => {
        if (uncompleted[id].completed) delete uncompleted[id];
      });
      return uncompleted;
    default:
      return state;
  }
};
