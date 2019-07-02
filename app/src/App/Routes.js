import React from "react";
import Landing from '../Main/Landing'
import Login from '../Main/Login/Login'
import CreateAcc from '../Main/CreateAcc/CreateAcc'
import Guest from '../Main/Guest/Guest'
import Query from '../Main/Query/Query'
import ForgotPass from '../Main/Forgot/Forgot'
import NotFound from "./NotFound"
import AppliedRoute from "./AppliedRoute"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


export default ({ childProps }) =>
<Router>
    <Switch>
      <AppliedRoute path="/" exact component={Landing} props={childProps} />
      <AppliedRoute path="/Login" exact component={Login} props={childProps} />
      <AppliedRoute path="/Guest" component={Guest} props={childProps}/>
      <AppliedRoute path = "/Create" component={CreateAcc} props={childProps}/>
      <AppliedRoute path = "/Forgot" component={ForgotPass} props={childProps}/>
      <AppliedRoute path = "/Query" component={Query} props={childProps}/>
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
      {/*<Route path = "/Student" component={Student} />
      <Route path = "/form" component={Form} />*/}
    </Switch>
  </Router>;
