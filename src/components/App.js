import React from "react";
import Header from "./Header";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Info from "./Info"
import "./todos.css";

const App = () => {
  return (
    <div className="todos">
      <Header text="todos" />
      <div className="todos-wrapper">
        <TodoInput />
        <TodoList />
      </div>
      <Info />
    </div>
  );
};

export default App;
