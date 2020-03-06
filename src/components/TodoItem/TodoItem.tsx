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
  EditInput,
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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await startEditTodo(todo.id, todoValue);
    setInEdit(false);
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
        <form onSubmit={onSubmit}>
          <Description completed={todo.completed}>
            <span>{todo.description}</span>
            <EditInput type="text" onChange={onInputChange} value={todoValue} />
          </Description>
        </form>
      </OutsideClick>
    ) : (
      <>
        <Toggle
          data-todo={todo.id}
          onChange={onToggle}
          type="checkbox"
          checked={Boolean(todo.completed)}
        />
        <Description onDoubleClick={startEdit} completed={todo.completed}>
          <CheckBox
            completed={todo.completed}
            hide={inEdit || snapshot.isDragging}
          >
            <Icon />
          </CheckBox>
          {todo.description}
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
