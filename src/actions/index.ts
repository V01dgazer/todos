import { Todo, Todos } from "../types/types";
import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  FILTER_TODOS,
  CLEAR_COMPLETED,
  AppActions,
  REORDER_TODOS
} from "../types/action-types";
import { Dispatch } from "redux";
import { AppState } from "../store";

export const addTodo = (todo: Todo): AppActions => ({
  type: ADD_TODO,
  todo
});

export const editTodo = (todo: Todo): AppActions => ({
  type: EDIT_TODO,
  todo
});

export const deleteTodo = (id: string): AppActions => ({
  type: DELETE_TODO,
  id
});

export const filterTodos = (filter: string): AppActions => ({
  type: FILTER_TODOS,
  filter
});

export const toggleTodo = (id: string): AppActions => ({
  type: TOGGLE_TODO,
  id
});

export const toggleAllTodos = (value: boolean): AppActions => ({
  type: TOGGLE_ALL_TODOS,
  value
});

export const clearCompleted = (): AppActions => ({
  type: CLEAR_COMPLETED
});

export const reorderTodos = (todos: Todos): AppActions => ({
  type: REORDER_TODOS,
  todos
});

export const startEditTodo = (id: string, description: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    if (!description.length) {
      dispatch(deleteTodo(id));
    } else {
      const { todos } = getState();
      const todo = todos[id];
      todo.description = description;
      dispatch(editTodo(todo));
    }
  };
};

export const startToggleTodo = (id: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    await dispatch(toggleTodo(id));

    const { todos } = getState();
    const keys = Object.keys(todos);
    const allToggled = keys.length
      ? keys.every(k => todos[k].completed)
      : false;
    if (allToggled) dispatch(toggleAllTodos(allToggled));
  };
};
