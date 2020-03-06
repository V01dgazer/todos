import styled, { css } from "styled-components";

export const FiltersList = styled.ul`
  flex: 0 1 50%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    flex: 1 1 100%;
  }
`;

export const FooterWrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 15px;
  color: #777777;
  border-top: 1px solid #e6e6e6;
  font-size: 14px;
  :before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 500px) {
    justify-content: center;
  }

  > *:not(${FiltersList}) {
    flex: 0 1 25%;
    font-size: inherit;

    @media screen and (max-width: 500px) {
      flex-basis: auto;
      margin: 15px 15px 0;
    }
  }
`;

interface Props {
  selected: boolean;
}

export const FilterButton = styled.button`
  position: relative;
  z-index: 10;
  padding: 3px 7px;
  margin: 3px;
  border-radius: 3px;
  background-color: transparent;
  border: 1px solid transparent;
  outline: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
  :hover {
    border-color: rgba(175, 47, 47, 0.1);
  }
  ${(props: Props) =>
    props.selected &&
    css`
      border-color: rgba(175, 47, 47, 0.2);
    `}
`;

export const Clear = styled.button`
  position: relative;
  z-index: 10;
  background-color: transparent;
  color: inherit;
  border: none;
  outline: none;
  text-align: right;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 500px) {
    order: 2;
  }
`;

export const Count = styled.span`
  @media screen and (max-width: 500px) {
    order: 1;
  }
`;
