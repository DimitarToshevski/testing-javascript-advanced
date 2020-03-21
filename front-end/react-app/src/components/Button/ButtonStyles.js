import styled, { css } from "styled-components";

export const buttonColors = {
  primary: "#521751",
  disabled: "lightgray",
  default: "#ddd"
};

const getStylesByType = type => {
  switch (type) {
    case "primary":
      return css`
        background: ${buttonColors.primary};
        color: white;
        border: 1px solid ${buttonColors.primary};
      `;
    default:
      return css`
        background: ${buttonColors.default};
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
    background: ${buttonColors.disabled};
    border: 1px solid ${buttonColors.disabled};
    color: darkgrey;
    cursor: default;
  }
`;
