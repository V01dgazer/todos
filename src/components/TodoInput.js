import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, toggleAllTodos } from "../actions";

const TodoInput = props => {
  const { todos, toggleAll, addTodo, toggleAllTodos } = props;
  const [value, setValue] = useState("");

  const onInputChange = e => {
    setValue(e.target.value);
  };

  const onInputSubmit = e => {
    if (e.key !== "Enter" || !value.length) return;

    const lastTodo = todos[Object.keys(todos).slice(-1)];
    const id = lastTodo ? lastTodo.id + 1 : 1;
    addTodo({ id, description: value, completed: false });
    setValue("");
  };

  const onToggleClick = () => {
    toggleAllTodos(!toggleAll);
  };

  const renderToggleAllButton = () => {
    if (!Object.keys(todos).length) return null;

    const toggled = toggleAll ? "todos-toggle-all--checked" : "";
    return (
      <button onClick={onToggleClick} className={`todos-toggle-all ${toggled}`}>
        ❯
      </button>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {renderToggleAllButton()}
      <input
        type="text"
        value={value}
        onChange={onInputChange}
        onKeyDown={onInputSubmit}
        className="todos-input"
        placeholder="What needs to be done?"
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todos: state.todos,
    toggleAll: state.toggleAll
  };
};

export default connect(
  mapStateToProps,
  { addTodo, toggleAllTodos }
)(TodoInput);
