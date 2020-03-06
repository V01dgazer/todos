import { Todo, Todos } from "./types";

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const FILTER_TODOS = "FILTER_TODOS";
export const REORDER_TODOS = "REORDER_TODOS";

export interface AddTodoAction {
  type: typeof ADD_TODO;
  todo: Todo;
}

export interface EditTodoAction {
  type: typeof EDIT_TODO;
  todo: Todo;
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  id: string;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  id: string;
}

export interface ClearCompletedAction {
  type: typeof CLEAR_COMPLETED;
}

export interface FilterTodosAction {
  type: typeof FILTER_TODOS;
  filter: string;
}

export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS;
  value: boolean;
}

export interface ReorderTodosAction {
  type: typeof REORDER_TODOS;
  todos: Todos;
}

export type TodoActionTypes =
  | AddTodoAction
  | EditTodoAction
  | DeleteTodoAction
  | ToggleTodoAction
  | ClearCompletedAction
  | FilterTodosAction
  | ToggleAllTodosAction
  | ReorderTodosAction;

export type AppActions = TodoActionTypes;
