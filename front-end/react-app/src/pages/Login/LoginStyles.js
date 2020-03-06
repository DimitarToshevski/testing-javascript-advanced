import styled from "styled-components";

import Button from "components/Button/Button";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

export const ButtonWrapper = styled.div`
  margin: 10px 8px 10px 0;
  text-align: right;
`;

export const LoginButton = styled(Button)`
  margin: 0;
`;

export const ErrorMsg = styled.div`
  padding: 10px 0;
  color: #e60000;
`;
