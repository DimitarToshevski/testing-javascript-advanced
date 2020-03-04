import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import paths from "paths";
import { useAuthToken } from "hooks/useAuthToken";
import ApiService from "services/ApiService";
import InputField from "components/InputField/InputField";

import { FormWrapper, Form, ButtonWrapper, LoginButton } from "./LoginStyles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setToken] = useAuthToken();

  const login = async e => {
    e.preventDefault();

    const res = await ApiService.post("login", {
      username,
      password
    });

    if (res.token) {
      setToken(res.token);
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
          <LoginButton text="Login" type="primary" onClick={login} />
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  );
};
export default Login;
