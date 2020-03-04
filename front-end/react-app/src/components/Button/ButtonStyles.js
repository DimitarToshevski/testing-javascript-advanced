import styled, { css } from "styled-components";

const getStylesByType = type => {
  switch (type) {
    case "primary":
      return css`
        background: #521751;
        color: white;
        border: 1px solid #521751;
      `;
    default:
      return css`
        background: #ddd;
        border: none;
      `;
  }
};

export const Btn = styled.button`
  font: inherit;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  margin: 0 1rem;
  cursor: pointer;

  ${props => getStylesByType(props.type)}

  &:disabled {
    background: lightgray;
    border: 1px solid lightgray;
    color: darkgrey;
    cursor: default;
  }
`;
