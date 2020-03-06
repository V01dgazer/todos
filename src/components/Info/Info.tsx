import * as React from "react";
import { InfoWrapper, InfoLink } from "./styles";

const Info = React.memo(() => {
  return (
    <InfoWrapper>
      <p>Double-click to edit a todo</p>
      <p>
        Drag &amp; Drop with{" "}
        <InfoLink href="https://github.com/atlassian/react-beautiful-dnd">
          react-beautiful-dnd
        </InfoLink>
      </p>
      <p>
        Design from&nbsp;
        <InfoLink href="http://todomvc.com/examples/react/" target="_blank">
          TodoMVC
        </InfoLink>
      </p>
    </InfoWrapper>
  );
});

export default Info;
