import * as React from "react";
import { Ref } from "../../types/types";

const useOutsideClick = (func: Function, ref: Ref) => {
  function handleClickOutside(e: Event) {
    if (ref.current && !ref.current.contains(e.target)) {
      func();
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
};

interface Props {
  func: () => void;
  children: React.ReactNode;
}

export default (props: Props) => {
  const wrapperRef = React.useRef(null);
  useOutsideClick(props.func, wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
};
