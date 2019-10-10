import {
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  EDIT_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED,
  FILTER_TODOS
} from "./types";

export const addTodo = todo => {
  return {
    type: ADD_TODO,
    payload: todo
  };
};

export const toggleTodo = id => async (dispatch, getState) => {
  await dispatch({ type: TOGGLE_TODO, payload: id });

  const { todos } = getState();
  const keys = Object.keys(todos);
  const allToggled = keys.length
    ? keys.every(todo => todos[todo].completed)
    : false;
  if (allToggled) dispatch(toggleAllTodos(allToggled));
};

export const toggleAllTodos = value => {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: value
  };
};

export const editTodo = (id, description) => async (dispatch, getState) => {
  if (!description.length) {
    dispatch(deleteTodo(id));
  } else {
    const { todos } = getState();
    const newTodo = todos[id];
    newTodo.description = description;
    dispatch({ type: EDIT_TODO, payload: newTodo });
  }
};

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    payload: id
  };
};

export const clearCompleted = () => {
  return { type: CLEAR_COMPLETED };
};

export const filterTodos = filter => {
  return {
    type: FILTER_TODOS,
    payload: filter
  };
};
