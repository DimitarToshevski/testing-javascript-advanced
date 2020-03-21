import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import paths from "paths";
import Login from "pages/Login/Login";
import Products from "pages/Products/Products";
import { GlobalStyles } from "./AppStyles";

const App = () => (
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
          <Redirect to={paths.products} />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
