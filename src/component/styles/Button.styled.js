import styled from "styled-components";

export const ButtonStyled = styled.button`
  transition: all 400ms ease;
  cursor: pointer;
  color: white;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  text-align: center;

  &:hover {
    background-color: #2c974b;
  }
`;
