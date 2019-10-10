import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toggleTodo, editTodo, deleteTodo } from "../actions";
import OutsideClick from "./OutsideClick";

const TodoItem = props => {
  const { todo, toggleTodo, editTodo, deleteTodo } = props;
  const [inEdit, setInEdit] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.description);

  useEffect(() => {
    const handleEsc = e => {
      if (e.keyCode === 27) {
        setTodoValue(todo.description);
        setInEdit(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [todo.description]);

  const completedClass = todo.completed
    ? "todos-list-item__description--completed"
    : "";
  const editClass = inEdit ? "todos-list-item__description--editing" : "";
  const checked = todo.completed ? "checked" : "";

  const onInputChange = e => {
    setTodoValue(e.target.value);
  };

  const onSubmit = async e => {
    if (e) e.preventDefault();
    await editTodo(todo.id, todoValue);
    setInEdit(false);
  };

  const renderItem = () => {
    return inEdit ? (
      <OutsideClick func={() => onSubmit()}>
        <form onSubmit={onSubmit}>
          <label
            className={`todos-list-item__description ${completedClass} ${editClass}`}
          >
            {todo.description}
            <input
              type="text"
              onChange={onInputChange}
              value={todoValue}
              className="todos-list-item__edit"
            />
          </label>
        </form>
      </OutsideClick>
    ) : (
      <React.Fragment>
        <input
          onChange={() => toggleTodo(todo.id)}
          type="checkbox"
          checked={checked}
          className="todos-list-item__toggle"
        />
        <label
          onDoubleClick={() => setInEdit(true)}
          className={`todos-list-item__description ${completedClass}`}
        >
          {todo.description}
        </label>
        <button
          className="todos-list-item__delete"
          onClick={() => deleteTodo(todo.id)}
        />
      </React.Fragment>
    );
  };

  return <li className="todos-list-item">{renderItem()}</li>;
};

export default connect(
  null,
  { toggleTodo, editTodo, deleteTodo }
)(TodoItem);
