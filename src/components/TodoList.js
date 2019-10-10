import React from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";
import Footer from "./Footer";

const TodoList = ({ todos }) => {
  return (
    <div className="todos-list__container">
      <ul className="todos-list">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

const getVisibleTodos = (todos, filter) => {
  const todosArr = Object.values(todos);
  switch (filter) {
    case "SHOW_ALL":
      return todosArr;
    case "SHOW_COMPLETED":
      return todosArr.filter(todo => todo.completed === true);
    case "SHOW_ACTIVE":
      return todosArr.filter(todo => todo.completed === false);
    default:
      return todosArr;
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.filter)
  };
};

export default connect(mapStateToProps)(TodoList);
