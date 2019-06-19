import React from 'react';
import './css/App.css';
import Landing from './Landing'
import Login from './Login'
import CreateAcc from './CreateAcc'
import Guest from './Guest'
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
