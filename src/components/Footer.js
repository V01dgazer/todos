import React from "react";
import { connect } from "react-redux";
import { filterTodos, clearCompleted } from "../actions";

const filters = {
  SHOW_ALL: {
    text: "All"
  },
  SHOW_ACTIVE: {
    text: "Active"
  },
  SHOW_COMPLETED: {
    text: "Completed"
  }
};

const Footer = props => {
  const { todos, clearCompleted, filterTodos, currentFilter } = props;
  if (!todos || !todos.length) return null;

  const uncompleted = todos.filter(todo => !todo.completed);
  const itemsStr =
    uncompleted.length > 1 || !uncompleted.length ? "items" : "item";

  const renderClearButton = () => {
    return uncompleted.length !== todos.length ? (
      <button onClick={() => clearCompleted()} className="todos-footer-clear">
        Clear completed
      </button>
    ) : null;
  };

  return (
    <footer className="todos-footer">
      <span className="todos-footer-count">
        {uncompleted.length} {itemsStr} left
      </span>
      <ul className="todos-footer-filters">
        {Object.keys(filters).map(filterKey => (
          <li key={`filter-${filterKey}`}>
            <button
              onClick={() => filterTodos(`${filterKey}`)}
              className={`todos-footer-button ${
                currentFilter === filterKey ? "selected" : ""
              }`}
            >
              {filters[filterKey].text}
            </button>
          </li>
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
};

const mapStateToProps = state => {
  return {
    todos: Object.values(state.todos),
    currentFilter: state.filter
  };
};

export default connect(
  mapStateToProps,
  { filterTodos, clearCompleted }
)(Footer);
