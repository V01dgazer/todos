import React, { useEffect, useRef } from "react";

const useOutsideClick = (func, ref) => {
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      func();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
};

export default props => {
  const wrapperRef = useRef(null);
  useOutsideClick(props.func, wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
};
