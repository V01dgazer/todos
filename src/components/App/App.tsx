import * as React from "react";
import Header from "../Header";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import Info from "../Info";
import { Todos, Wrapper } from "./styles";

const App = React.memo(() => {
  return (
    <Todos>
      <Header text="todos" />
      <Wrapper>
        <TodoInput />
        <TodoList />
      </Wrapper>
      <Info />
    </Todos>
  );
});

export default App;
