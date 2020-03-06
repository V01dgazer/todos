import styled from "styled-components";

export const Todos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 55px;
  background-color: rgb(245, 245, 245);
`;

export const Wrapper = styled.div`
  position: relative;
  width: 550px;
  max-width: 90%;
  background: #fff;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03),
    0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
