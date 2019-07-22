import React, { Component } from 'react';
import './App.css';
import Landing from '../Main/Landing'
import Login from '../Main/Login/Login'
import CreateAcc from '../Main/CreateAcc/CreateAcc'
import Guest from '../Main/Guest/Guest'
import Query from '../Main/Query/Query'
import ForgotPass from '../Main/Forgot/Forgot'
import Routes from './Routes'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  return (


    <div className="App">

          <Routes childProps={childProps} />
          {/*<Route path = "/Student" component={Student} />
          <Route path = "/form" component={Form} />*/}


    </div>
  );
  }
}

export default App;
