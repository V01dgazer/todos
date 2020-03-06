import * as React from "react";
import { connect } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import TodoItem from "../TodoItem";
import Footer from "../Footer";
import { reorderTodos } from "../../actions";
import { Todo as TodoType, Todos } from "../../types/types";
import { TodoActionTypes } from "../../types/action-types";
import { AppState } from "../../store";
import { ListContainer, List } from "./styles";

interface Props {
  todos: TodoType[];
  reorderTodos: (todos: Todos) => TodoActionTypes;
}

const reorder = (
  todos: TodoType[],
  startIndex: number,
  endIndex: number
): Todos => {
  const result: Todos = {};
  const [removed] = todos.splice(startIndex, 1);
  todos.splice(endIndex, 0, removed);
  todos.forEach((todo: TodoType, index: number) => {
    todo.order = index;
    result[todo.id] = todo;
  });
  return result;
};

const TodoList: React.FC<Props> = props => {
  const { todos, reorderTodos } = props;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(todos, result.source.index, result.destination.index);
    reorderTodos(items);
  };

  return (
    <ListContainer style={{ minHeight: `${62 * todos.length}px` }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo: TodoType, index: number) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <TodoItem
                      todo={todo}
                      innerRef={provided.innerRef}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Footer />
    </ListContainer>
  );
};

const getVisibleTodos = (todos: Todos, filter: string) => {
  const todosArr = Object.values(todos).sort(
    (a: TodoType, b: TodoType) => a.order - b.order
  );
  switch (filter) {
    case "SHOW_ALL":
      return todosArr;
    case "SHOW_COMPLETED":
      return todosArr.filter((todo: TodoType) => todo.completed === true);
    case "SHOW_ACTIVE":
      return todosArr.filter((todo: TodoType) => todo.completed === false);
    default:
      return todosArr;
  }
};

const mapStateToProps = (state: AppState) => {
  return {
    todos: getVisibleTodos(state.todos, state.filter)
  };
};

export default connect(
  mapStateToProps,
  { reorderTodos }
)(TodoList);
