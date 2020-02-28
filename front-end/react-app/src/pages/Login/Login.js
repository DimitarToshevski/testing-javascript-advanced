import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import paths from "paths";
import { useAuthToken } from "hooks/useAuthToken";
import ApiService from "services/ApiService";
import InputField from "components/InputField/InputField";
import Button from "components/Button/Button";
import "./Login.css";

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
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <InputField
          id="username"
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="button-container">
          <Button text="Login" onClick={login} />
        </div>
      </form>
    </div>
  );
};
export default Login;
