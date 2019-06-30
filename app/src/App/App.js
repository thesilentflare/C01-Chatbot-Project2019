import React from 'react';
import './App.css';
import Landing from '../Main/Landing'
import Login from '../Main/Login/Login'
import CreateAcc from '../Main/CreateAcc/CreateAcc'
import Guest from '../Main/Guest/Guest'
import Query from '../Main/Query/Query'
import ForgotPass from '../Main/Forgot/Forgot'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (


    <div className="App">
    <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
<<<<<<< HEAD
          <Route exact path="/Guest" component={Guest} />
          <Route exact path = "/Login" component={Login} />
          <Route exact path = "/Create" component={CreateAcc} />
          <Route exact path = "/Forgot" component={ForgotPass} />
          <Route exact path = "/Query" component={Query} />
=======
          <Route exact path="/guest" component={Guest} />
          <Route exact path = "/login" component={Login} />
          <Route exact path = "/create" component={CreateAcc} />
>>>>>>> feature/react-createaccount
          {/*<Route path = "/Student" component={Student} />
          <Route path = "/form" component={Form} />*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
