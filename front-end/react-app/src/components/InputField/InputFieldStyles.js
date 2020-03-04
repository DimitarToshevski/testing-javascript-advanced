import styled, { css } from "styled-components";

const inputStyles = css`
  display: block;
  width: 100%;
`;

export const InputWrapper = styled.div`
  margin: 1rem;
`;

export const Label = styled.label`
  ${inputStyles}
`;

export const Input = styled.input`
  ${inputStyles}
  font: inherit;
`;
