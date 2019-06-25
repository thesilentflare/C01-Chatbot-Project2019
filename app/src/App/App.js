import React from 'react';
import './App.css';
import Landing from '../Main/Landing'
import Login from '../Main/Login/Login'
import CreateAcc from '../Main/CreateAcc/CreateAcc'
import Guest from '../Main/Guest/Guest'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (


    <div className="App">
    <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/guest" component={Guest} />
          <Route exact path = "/login" component={Login} />
          <Route exact path = "/create" component={CreateAcc} />
          {/*<Route path = "/Student" component={Student} />
          <Route path = "/form" component={Form} />*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
