import * as React from "react";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { addTodo, toggleAllTodos } from "../../actions";
import { AppState } from "../../store";
import { Todo as TodoType } from "../../types/types";
import { TodoActionTypes } from "../../types/action-types";
import { Input, ToggleAllButton } from "./styles";

interface Props {
  todos: {
    [key: string]: TodoType;
  };
  toggleAll: boolean;
  toggleAllTodos: (value: boolean) => TodoActionTypes;
  addTodo: (todo: TodoType) => TodoActionTypes;
}

const TodoInput: React.FC<Props> = props => {
  const { todos, toggleAll, addTodo, toggleAllTodos } = props;
  const [value, setValue] = React.useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !value.trim().length) return;

    addTodo({
      id: uuid(),
      description: value.trim(),
      completed: false,
      order: Object.keys(todos).length
    });
    setValue("");
  };

  const onToggleClick = () => {
    toggleAllTodos(!toggleAll);
  };

  const todosLength = Boolean(Object.keys(todos).length);
  return (
    <div style={{ position: "relative" }}>
      {todosLength && (
        <ToggleAllButton onClick={onToggleClick} toggleAll={toggleAll}>
          ❯
        </ToggleAllButton>
      )}
      <Input
        type="text"
        value={value}
        onChange={onInputChange}
        onKeyDown={onInputSubmit}
        placeholder="What needs to be done?"
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    todos: state.todos,
    toggleAll: state.toggleAll
  };
};

export default connect(
  mapStateToProps,
  { addTodo, toggleAllTodos }
)(TodoInput);
