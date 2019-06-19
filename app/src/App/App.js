import React from 'react';
import './App.css';
import Landing from '../Main/Landing'
import Login from '../Main/Login'
import CreateAcc from '../Main/CreateAcc'
import Guest from '../Main/Guest'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (


    <div className="App">
    <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Guest" component={Guest} />
          <Route exact path = "/Login" component={Login} />
          <Route exact path = "/Create" component={CreateAcc} />
          {/*<Route path = "/Student" component={Student} />
          <Route path = "/form" component={Form} />*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
