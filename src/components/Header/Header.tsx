import * as React from "react";
import { HeaderWrapper } from "./styles";

const Header = React.memo(({ text }: { text: string }) => {
  return <HeaderWrapper className="todos-header">{text}</HeaderWrapper>;
});

export default Header;
