import React, { Component } from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import * as comp from './Components'


class Login extends Component {
  constructor(){
    super();
    this.state = {
      formIsValid: false,
      redirect: false,
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

  formSubmitHandler = () => {
  	const formData = {}; //All data stored as dictionary
  	for (let formElementId in this.state.formControls) {
  	    formData[formElementId] = this.state.formControls[formElementId].value;
  	}
      for (var data in formData){
        alert(formData[data]); //testing each value sent
      }

      if (true){
        this.setState({redirect: true}); //send data to server, check then set to true
      }
    }

  renderRedirect = () => {
    return <Redirect to='/guest' />
  }


  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/guest' />
    }
    return (
      <div className="">
      Login

      <comp.Email name="email"
                placeholder={this.state.formControls.email.placeholder}
                value={this.state.formControls.email.value}
                onChange={this.changeHandler}
                touched={this.state.formControls.email.touched}
                valid={this.state.formControls.email.valid}
      />
      <comp.Password name="password"
                placeholder={this.state.formControls.password.placeholder}
                value={this.state.formControls.password.value}
                onChange={this.changeHandler}
                touched={this.state.formControls.password.touched}
                valid={this.state.formControls.password.valid}
      />
      <button onClick={this.formSubmitHandler}
                disabled={! this.state.formIsValid}
      >
        Login
      </button>


      </div>


    );
  }
}
export default Login;
