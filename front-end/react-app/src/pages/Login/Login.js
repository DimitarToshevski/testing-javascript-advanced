import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import paths from "paths";
import { useAuthToken } from "hooks/useAuthToken";
import ApiService from "services/ApiService";
import InputField from "components/InputField/InputField";

import {
  FormWrapper,
  Form,
  ButtonWrapper,
  LoginButton,
  ErrorMsg
} from "./LoginStyles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [authToken, setToken] = useAuthToken();

  const login = async e => {
    e.preventDefault();

    const res = await ApiService.post("login", {
      username,
      password
    });

    if (res.token) {
      setError(null);
      setToken(res.token);
    } else {
      setError(res.message);
    }
  };

  if (authToken) {
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
          onChange={e => setUsername(e.target.value)}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <ButtonWrapper>
          <LoginButton
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
export default Login;
