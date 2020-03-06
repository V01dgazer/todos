import {
  TodoActionTypes,
  ADD_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  DELETE_TODO,
  CLEAR_COMPLETED,
  REORDER_TODOS
} from "../types/action-types";
import { Todos } from "../types/types";

export default (state: Todos = {}, action: TodoActionTypes): Todos => {
  switch (action.type) {
    case ADD_TODO:
    case EDIT_TODO:
      return { ...state, [action.todo.id]: action.todo };
    case TOGGLE_TODO:
      const toggledTodo = Object.assign({}, state[action.id]);
      toggledTodo.completed = !toggledTodo.completed;
      return { ...state, [action.id]: toggledTodo };
    case TOGGLE_ALL_TODOS:
      const toggledTodos = JSON.parse(JSON.stringify(state));
      Object.keys(toggledTodos).forEach(
        id => (toggledTodos[id].completed = action.value)
      );
      return toggledTodos;
    case DELETE_TODO:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    case CLEAR_COMPLETED:
      const uncompleted = JSON.parse(JSON.stringify(state));
      Object.keys(uncompleted).forEach(id => {
        if (uncompleted[id].completed) delete uncompleted[id];
      });
      return uncompleted;
    case REORDER_TODOS:
      return { ...state, ...action.todos };
    default:
      return state;
  }
};
