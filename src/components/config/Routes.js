import React from "react";
import Signin from "../login/Index";
import Home from "../home/Index";
import { isAuthenticate } from "./auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <Router>
    <Switch>            
      <Route path="/" exact={true} component={Signin} />{" "}
      <PrivateRouter path="/home" component={Home} />{" "}
    </Switch>{" "}
  </Router>
);
export default Routes;