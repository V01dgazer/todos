import * as React from "react";
import { connect } from "react-redux";
import { filterTodos, clearCompleted } from "../../actions";
import { Todo, Filters } from "../../types/types";
import { TodoActionTypes } from "../../types/action-types";
import { AppState } from "../../store";
import {
  FooterWrapper,
  Clear,
  FilterButton,
  FiltersList,
  Count
} from "./styles";

const filters: Filters = {
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

interface Props {
  todos: Todo[];
  clearCompleted: () => TodoActionTypes;
  filterTodos: (filter: string) => TodoActionTypes;
  currentFilter: string;
}

const Footer = (props: Props) => {
  const { todos, clearCompleted, filterTodos, currentFilter } = props;
  if (!todos || !todos.length) return null;

  const uncompleted = todos.filter(todo => !todo.completed);
  const itemsStr =
    uncompleted.length > 1 || !uncompleted.length ? "items" : "item";

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { filter } = (e.currentTarget.parentNode as HTMLLIElement).dataset;
    filterTodos(filter);
  };

  return (
    <FooterWrapper>
      <Count>
        {uncompleted.length} {itemsStr} left
      </Count>
      <FiltersList className="todos-footer-filters">
        {Object.keys(filters).map(filterKey => (
          <li key={`filter-${filterKey}`} data-filter={filterKey}>
            <FilterButton
              onClick={clickHandler}
              selected={currentFilter === filterKey}
            >
              {filters[filterKey].text}
            </FilterButton>
          </li>
        ))}
      </FiltersList>
      {uncompleted.length !== todos.length && (
        <Clear onClick={clearCompleted}>Clear completed</Clear>
      )}
    </FooterWrapper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    todos: Object.values(state.todos),
    currentFilter: state.filter
  };
};

export default connect(
  mapStateToProps,
  { filterTodos, clearCompleted }
)(Footer);
