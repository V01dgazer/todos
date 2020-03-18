import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Check } from "./checkbox.svg";
import { ReactComponent as Edit } from "./edit.svg";
import { ReactComponent as Delete } from "./delete.svg";

export const ButtonsWrapper = styled.div`
  display: none;
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 65px;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

export const EditIcon = styled(Edit)`
  fill: #cc9a9a;
  transition: fill 0.2s;
  :hover {
    fill: #54e0c7;
  }
`;

export const DeleteIcon = styled(Delete)`
  fill: #cc9a9a;
  transition: fill 0.2s;
  :hover {
    fill: #af5b5e;
  }
`;

export const CheckBox = styled.div`
  content: "";
  position: absolute;
  left: 10px;
  top: 15px;
  display: block;
  width: 32px;
  height: 32px;
  border: 2px solid #d1d7dc;
  border-radius: 50%;
  opacity: 0.4;
  transition: opacity 0.2s;

  ${(props: Props) =>
    props.completed &&
    css`
      background-color: #54e0c7;
      border-color: #54e0c7;
      opacity: 1;
    `}
  ${(props: Props) =>
    !props.completed &&
    props.hide &&
    css`
      opacity: 0;
    `}
`;

export const Item = styled.li`
  position: relative;
  width: 100%;
  padding: 16px 16px 16px 60px;
  outline: 0;
  :hover ${ButtonsWrapper} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :hover ${CheckBox} {
    opacity: 0.8;
  }
`;

interface Props {
  completed: boolean;
  hide?: boolean;
}

export const Description = styled.label`
  display: block;
  word-break: break-all;
  white-space: pre-wrap;
  transition: all 0.4s;

  ${(props: Props) =>
    props.completed &&
    css`
      text-decoration: line-through;
    `}
`;

export const Icon = styled(Check)`
  transform: translate(2px, 3px);
`;

export const Toggle = styled.input`
  height: 38px;
  width: 38px;
  position: absolute;
  z-index: 5;
  top: 15px;
  left: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  :focus {
    outline: none;
  }
`;

const EditAppear = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

export const EditArea = styled.textarea`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% + 2px);
  padding: 6px;
  border: 1px solid #999;
  outline: none;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  font-size: 24px;
  line-height: 1.4em;
  animation: ${EditAppear} 0.2s;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 7px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
  resize: none;
  :focus {
    outline: none;
  }
`;
