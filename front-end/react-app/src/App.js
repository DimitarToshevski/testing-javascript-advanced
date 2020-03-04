import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import paths from "paths";
import { useAuthToken } from "hooks/useAuthToken";
import Login from "pages/Login/Login";
import Products from "pages/Products/Products";
import { GlobalStyles } from "./AppStyles";

const App = () => {
  const [authToken] = useAuthToken();

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={paths.products}>
            <Products />
          </Route>
          <Route path={paths.login}>
            <Login />
          </Route>
          <Route path="/">
            <Redirect to={authToken ? paths.products : paths.login} />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
