import React, { Component } from 'react';
import { NavLink, Redirect} from 'react-router-dom';
import * as comp from './Components';
import {Navbar} from '../Header';
import Authenticator from '../../Auth/Authenticator';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      formIsValid: false,
      redirectQuery: false,
      redirectForgot: false,
      redirectMain: false,
      formControls: {
        email: {
          value: '',
          placeholder: 'Email',
          valid: false,
          validationRules: {
            isRequired: true
          },
          touched: false
        },
        password: {
          value: '',
          placeholder: 'Password',
          valid: false,
          validationRules: {
            isRequired: true,
            minLength: 2
          },
          touched: false
        }
      }
    }
  }

  changeHandler = event => {

    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
	     ...this.state.formControls
    };
    const updatedFormElement = {
	     ...updatedControls[name]
    };

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = comp.Validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
    	formControls: updatedControls,
      formIsValid: formIsValid
    });

  }

  formSubmitHandler = async event => {
    event.preventDefault();
  	const formData = {}; {/*/All data stored as dictionary*/}
  	for (let formElementId in this.state.formControls) {
  	    formData[formElementId] = this.state.formControls[formElementId].value;
  	}
      // for (var data in formData){
      //   // alert(formData[data]); {/*testing each value sent*/}
      // }
    var json = JSON.stringify(formData);
    //alert("json: "+json);
    // let axiosConfig = {headers:{'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}};
    // axios.post('http://localhost:3000/login', json, axiosConfig).then(res => localStorage.setItem('jwt', res.data));

    fetch('http://localhost:6060/login', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: json,
    }
    ) //mask the backend somewhere else
    .then(res => res.json())
  //   .then(res => {sessionStorage.setItem('jwt', (res.token))
  //   this.setState({redirectQuery: true});
  //   this.props.userHasAuthenticated(true, formData["email"])
  // })
    .then((res) => {
      //alert(JSON.stringify(res));
      if (res.message){
        alert(res.message);
      }
      else{
        // Upon successful authentication, proceed to query page
        sessionStorage.setItem('jwt', (res.token));
        this.setState({redirectQuery: true});
        this.props.userHasAuthenticated(true, formData["email"]);
      }
    })
    .catch(function(error) {console.log(error); alert(error);});






    // // alert(Authenticator(json,"login"));
    // // alert(formData["email"]);
    // {/*Here do the check*/}
    //   // if (Authenticator(json,"login")){
    //     alert("Logged in");
    //     this.props.userHasAuthenticated(true, formData["email"]);
    //      {/*send data to server, check then set to true*/}
    //     // alert(this.props.isAuthenticated)
    //   // }
    //
    // // else{
    // //
    // // }
    }






  redirectForgot = () => {
    this.setState({redirectForgot: true});
  }

  redirectMain = () => {
    this.setState({redirectMain: true});
  }

  render() {
    if (this.state.redirectQuery === true) {
      return <Redirect to='/query' props={this.props}/>
    }
    else if (this.state.redirectForgot === true) {
      return <Redirect to='/forgot' props={this.props}/>
    }
    else if (this.state.redirectMain === true) {
      return <Redirect to='/' props={this.props}/>
    }

    //console.log(this.props);
    return (
      <div className="">
        <Navbar props={ this.props }/>
        Login
        <form onSubmit={this.formSubmitHandler}>
          <div className="logincomponents">
            <div className="component">
              Email
              <comp.Email name="email"
                        placeholder={this.state.formControls.email.placeholder}
                        value={this.state.formControls.email.value}
                        onChange={this.changeHandler}
                        touched={this.state.formControls.email.touched}
                        valid={this.state.formControls.email.valid}
              />
            </div>
            <div className="component">
              Password
              <comp.Password name="password"
                        placeholder={this.state.formControls.password.placeholder}
                        value={this.state.formControls.password.value}
                        onChange={this.changeHandler}
                        touched={this.state.formControls.password.touched}
                        valid={this.state.formControls.password.valid}
              />
            </div>
            <div className="proceedText">
              <button className="proceedButton" onClick={this.formSubmitHandler}
                        disabled={! this.state.formIsValid}>
                Login
              </button>
            </div>
            <div className="proceedText">
              <button className="proceedButton" onClick={this.redirectForgot}>
                Forgot Password
              </button>
            </div>
          </div>
        </form>
        <div className="back">
          <button onClick={()=>this.redirectMain()}>Back to Main Page</button>
        </div>
      </div>


    );
  }
}
export default Login;
