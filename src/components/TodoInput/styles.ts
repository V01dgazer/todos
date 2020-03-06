import styled from "styled-components";

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
    font-size: 18px;
  }
`;

interface Props {
  toggleAll: boolean;
}

export const ToggleAllButton = styled.button`
  position: absolute;
  top: 50%;
  left: 14px;
  font-size: 22px;
  color: ${(props: Props) => (props.toggleAll ? "#737373" : "#e6e6e6")};
  border: none;
  outline: none;
  background: none;
  transform-origin: 50%;
  transform: translateY(-50%) rotate(90deg);
  cursor: pointer;
  transition: color 0.4s;
`;
