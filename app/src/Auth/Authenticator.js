import React, { Component } from 'react';
import { getJWT } from './Helpers';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Authenticator extends Component{
  constructor(props){
    super(props);

    this.state={
      user: undefined,
    }
  }

  // getJWT = () => {
  //   return sessionStorage.getItem('jwt');
  // }

  // Upon receiving credentials, authenticate if valid
  async componentDidMount(){
    const jwt = sessionStorage.getItem('jwt');
    console.log("this is the jwt:" + jwt);
    if (!jwt){
      this.props.history.push('/');
    }

    //console.log("passed here");
    var json = {"token": jwt.toString()};

    fetch('http://localhost:6060/user', {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        'content-type': 'application/json',
      },
    }
    ) //mask the backend somewhere else
    .then(res => res.json())
    .then(res => this.props.props.userDataSet(res))
    // Validation failed
    .catch(err => {console.log(err); {this.props.history.push('/login')}})

    // axios.get('http://localhost:4000/login', {}).then(res => this.setState({user: res.data})).catch(err => {
    //   this.props.history.push('/login')
    // })




    //console.log(this.props.props.accountName);
  }

  render(){
    //CHange this back to undefined instead of false
    if (this.state.user === true){
      return (
        <div><h1>LOADING...</h1></div>
      );
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}
export default withRouter(Authenticator);
