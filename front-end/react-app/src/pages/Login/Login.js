import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import paths from "paths";
import { useFormState } from "hooks/useFormState";
import { loginUser } from "store/actions/authActions";
import InputField from "components/InputField/InputField";

import {
  FormWrapper,
  Form,
  ButtonWrapper,
  LoginButton,
  ErrorMsg
} from "./LoginStyles";

const Login = ({ token, error, dispatch }) => {
  const [formState, handleChange] = useFormState({
    username: "",
    password: ""
  });
  const { username, password } = formState;

  const login = async e => {
    e.preventDefault();

    dispatch(loginUser(username, password));
  };

  if (token) {
    return <Redirect to={paths.products} />;
  }

  return (
    <FormWrapper>
      <h1>Login</h1>
      <Form>
        <InputField
          name="username"
          label="Username"
          value={username}
          onChange={handleChange}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
        />

        <ButtonWrapper>
          <LoginButton
            data-testid="loginBtn"
            text="Login"
            type="primary"
            onClick={login}
            isDisabled={username === "" || password === ""}
          />
        </ButtonWrapper>
      </Form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FormWrapper>
  );
};

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  error: auth.error
});

export default connect(mapStateToProps)(Login);
