import React, { Component } from 'react';
import * as comp from './FormComponents'

class AdminForm extends Component {
  constructor(){
    super();
    this.state = {
      formIsValid: false,
      formControls: {
        firstname: {
          value: '',
          placeholder: 'Firstname',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
            minLength: 1
          }
        },
        lastname: {
          value: '',
          placeholder: 'Lastname',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
            minLength: 1
          }
        },
        email: {
          value: '',
          placeholder: 'john.doe@mail.com',
          valid: false,
          validationRules: {
            isRequired: true,
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          placeholder: 'Password (min 8 characters)',
          valid: false,
          validationRules: {
            isRequired: true,
            minLength: 8
          },
          touched: false
        },
        token: {
          value: '',
          placeholder: 'Token',
          valid: false,
          validationRules: {
            isRequired: true,
            minLength: 10,
            isToken: true
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
    }

  render() {
    return (
      <div className="formcomponents">
        <comp.TextInput name="firstname"
                     placeholder={this.state.formControls.firstname.placeholder}
                     value={this.state.formControls.firstname.value}
                     onChange={this.changeHandler}
                     touched={this.state.formControls.firstname.touched}
                     valid={this.state.formControls.firstname.valid}
        />
        <comp.TextInput name="lastname"
                     placeholder={this.state.formControls.lastname.placeholder}
                     value={this.state.formControls.lastname.value}
                     onChange={this.changeHandler}
                     touched={this.state.formControls.lastname.touched}
                     valid={this.state.formControls.lastname.valid}
        />

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
        <comp.Password name="token"
                  placeholder={this.state.formControls.token.placeholder}
                  value={this.state.formControls.token.value}
                  onChange={this.changeHandler}
                  touched={this.state.formControls.token.touched}
                  valid={this.state.formControls.token.valid}
        />
        <button onClick={this.formSubmitHandler}
                  disabled={! this.state.formIsValid}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default AdminForm;
