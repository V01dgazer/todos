import styled, { keyframes, css } from "styled-components";

const shake = keyframes`{
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 60px;
  border: none;
  background-color: rgba(0, 0, 0, 0.003);
  font-size: 24px;
  line-height: 1.4em;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-style: italic;
    color: rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 768px) {
    padding-left: 45px;
    font-size: 17px;
  }
`;

interface ToggleProps {
  toggleAll: boolean;
}

export const ToggleAllButton = styled.button`
  position: absolute;
  top: 50%;
  left: 14px;
  font-size: 22px;
  color: ${(props: ToggleProps) => (props.toggleAll ? "#737373" : "#e6e6e6")};
  border: none;
  outline: none;
  background: none;
  transform-origin: 50%;
  transform: translateY(-50%) rotate(90deg);
  cursor: pointer;
  transition: color 0.4s;
`;

interface SubmitProps {
  error: boolean;
}

export const SubmitButton = styled.button`
  flex: 0 1 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;

  & > svg {
    height: 40px;
    fill: ${(props: SubmitProps) => (props.error ? "crimson" : "#54e0c7")};
    transition: fill 0.3s ease-out;
    ${(props: SubmitProps) =>
      props.error
        ? css`
            animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
          `
        : ""}
  }

  :hover > svg {
    fill: ${(props: SubmitProps) => (props.error ? "crimson" : "#3090b0")};
  }

  @media screen and (max-width: 768px) {
    flex: 0 1 20%;
    & > svg {
      height: 32px;
    }
  }
`;
