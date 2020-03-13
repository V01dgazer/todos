import * as React from "react";
import { connect } from "react-redux";
import { toggleTodo, startEditTodo, deleteTodo } from "../../actions";
import OutsideClick from "../OutsideClick";
import { Todo as TodoType } from "../../types/types";
import { TodoActionTypes } from "../../types/action-types";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  NotDraggingStyle,
  DraggingStyle
} from "react-beautiful-dnd";
import {
  Description,
  Item,
  CheckBox,
  Toggle,
  Icon,
  EditArea,
  EditIcon,
  ButtonsWrapper,
  DeleteIcon,
  Button
} from "./styles";

interface Props {
  todo: TodoType;
  innerRef: React.Ref<HTMLLIElement>;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  toggleTodo: (id: string) => TodoActionTypes;
  startEditTodo: (id: string, description: string) => TodoActionTypes;
  deleteTodo: (id: string) => TodoActionTypes;
}

const TodoItem = (props: Props) => {
  const {
    todo,
    toggleTodo,
    startEditTodo,
    deleteTodo,
    innerRef,
    provided,
    snapshot
  } = props;
  const [inEdit, setInEdit] = React.useState(false);
  const [todoValue, setTodoValue] = React.useState(todo.description);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setTodoValue(todo.description);
        setInEdit(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [todo.description]);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoValue(e.target.value);
  };

  const onSubmit = async (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e || (e.keyCode === 13 && !e.shiftKey)) {
      const value = todoValue.trim();
      await startEditTodo(todo.id, value);

      setTodoValue(value);
      setInEdit(false);
    }
  };

  const exit = () => {
    onSubmit();
  };

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { todo } = (e.currentTarget as HTMLInputElement).dataset;
    toggleTodo(todo);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { todo } = (e.currentTarget as HTMLButtonElement).dataset;
    deleteTodo(todo);
  };

  const startEdit = () => {
    setInEdit(true);
  };

  const getItemStyle = (
    dragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle
  ) => ({
    backgroundColor: dragging ? "lightgreen" : "inherit",
    border: dragging ? "2px solid #999" : "1px solid #ededed",
    color: dragging ? "#4d4d4d" : todo.completed ? "#d9d9d9" : "#4d4d4d",
    ...draggableStyle
  });

  const renderItem = () => {
    return inEdit ? (
      <OutsideClick func={exit}>
        <Description completed={todo.completed}>
          <pre>{todo.description}</pre>
          <EditArea
            onChange={onInputChange}
            onKeyDown={onSubmit}
            value={todoValue}
          />
        </Description>
      </OutsideClick>
    ) : (
      <>
        <Toggle
          data-todo={todo.id}
          onChange={onToggle}
          type="checkbox"
          checked={Boolean(todo.completed)}
        />
        <CheckBox
          completed={todo.completed}
          hide={inEdit || snapshot.isDragging}
        >
          <Icon />
        </CheckBox>
        <Description onDoubleClick={startEdit} completed={todo.completed}>
          <pre>{todo.description}</pre>
        </Description>
        <ButtonsWrapper>
          <Button onClick={startEdit}>
            <EditIcon />
          </Button>
          <Button onClick={onDelete} data-todo={todo.id}>
            <DeleteIcon />
          </Button>
        </ButtonsWrapper>
      </>
    );
  };

  return (
    <Item
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      {renderItem()}
    </Item>
  );
};

export default connect(
  null,
  { toggleTodo, startEditTodo, deleteTodo }
)(TodoItem);
