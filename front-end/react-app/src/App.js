import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import paths from "paths";
import Login from "pages/Login/Login";
import Products from "pages/Products/Products";
import { GlobalStyles } from "./AppStyles";

const App = ({ token }) => (
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
          <Redirect to={token ? paths.products : paths.login} />
        </Route>
      </Switch>
    </Router>
  </>
);

const mapStateToProps = ({ auth }) => ({
  token: auth.token
});

export default connect(mapStateToProps)(App);
