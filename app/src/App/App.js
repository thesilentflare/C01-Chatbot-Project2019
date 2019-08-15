import React, { Component, Fragment } from 'react';
import './App.css';
import Landing from '../Main/Landing'
import Login from '../Main/Login/Login'
import CreateAcc from '../Main/CreateAcc/CreateAcc'
import Guest from '../Main/Guest/Guest'
import Query from '../Main/Query/Query'
import ForgotPass from '../Main/Forgot/Forgot'
import { BrowserRouter as Router, Route as R, Switch } from "react-router-dom";
import Test from '../Main/test';
import Navbar from '../Main/Header/Navbar'
import Authenticator from '../Auth/Authenticator'
import NotFound from "./NotFound"
import Upload from '../Main/Upload/Upload'
import Auth from './GlobalVars'
import Admin from '../Main/Admin/Admin'
import Analytics from '../Main/Analytics/Analytics'

const Route = ({ props, component, ...args }) => {
  const Component = component;
  return <R { ...props } render={p => <Component { ...p } { ...props }/>}/>
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      accountName: "Guest",
      isAdmin: undefined,
      userData: undefined,
    }
  }
  async componentDidMount() {
  try {
    //this.userHasAuthenticated(true);
  }
  catch(e) {
    if (e !== 'No current user') {
      alert(e);
    }
  }
}

  setAdmin = () => {
    var admin = this.state.userData.admin;
    this.setState({
      isAdmin: admin,
    })
  }

  userDataSet = (data) => {
    // var dets = JSON.stringify(data);
    // console.log("app data: " + dets);
    var admin = data.user.admin;
    // console.log("app data2: " + admin);
  //  var raw = JSON.parse(data);
  //  console.log("app data2: " + raw);
    this.setState({
      userData: data,
      isAdmin: admin,
    });
    //console.log("isadmin: " + this.state.isAdmin);

  }
  // Checks to see if user is logged in
  userHasAuthenticated = (authenticated, accountName) => {
    this.setState({ isAuthenticated: authenticated,
      accountName: accountName
    });
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      accountName: this.state.accountName,
      isAdmin: this.state.isAdmin,
      userDataSet: this.userDataSet,
      setAdmin: this.setAdmin,
    };
    return (


    // Define all the route paths
    <div className="App">
    <Router>
        <Switch>
          <Route path="/" exact component={Landing} props={childProps} />
          <Route path="/login" exact component={Login} props={childProps} />
          <Route path="/test" component={Test} props={childProps} />
          <Route path="/guest" component={Guest} props={childProps}/>
          <Route path = "/create" component={CreateAcc} props={childProps}/>
          <Route path = "/forgot" component={ForgotPass} props={childProps}/>
          <Route path = "/admin" component={Admin} props={childProps}/>
          <Route path = "/analytics" component={Analytics} props={childProps}/>
          <Authenticator props={childProps}>
            <Route path = "/query" component={Query} props={childProps}/>
          </Authenticator>

          { /* Finally, catch all unmatched routes */ }
          <Route component={NotFound} />
        </Switch>
      </Router>









      {/*<Route path = "/Student" component={Student} />
      <Route path = "/form" component={Form} />*/}
    </div>
  );
  }
}

export default App;
