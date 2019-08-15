import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import * as comp from './FormComponents'
import './UserForm.css'

class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirectLogin: false,
      formIsValid: false,
      formControls: {
        gender: {
          value: '',
          placeholder: 'What is your gender',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
            isGender: false
          },
          options: [
            { value: '-', displayValue: 'Choose Gender' },
            { value: 'm', displayValue: 'Male' },
            { value: 'f', displayValue: 'Female'}
          ]
        },
        firstName: {
          value: '',
          placeholder: 'Firstname',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
            minLength: 1
          }
        },
        lastName: {
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
        purpose: {
          value: '',
          placeholder: 'What did you want to know about DFI?',
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
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
      // for (var data in formData){
      //   alert(formData[data]); //testing each value sent
      // }
      //this.props.redirecting();

    formData["admin"] = 0;

      var json = JSON.stringify(formData);
      //alert("json: "+json);
      console.log(json);


      fetch('http://localhost:6060/signup', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: json,
      }
      ) //mask the backend somewhere else
      .then((res) => {
        //alert(JSON.stringify(res));
        if (res.message){
          alert(res.message);
        }
        else{

          alert("Please Login Now with your credentials");
          this.setState({
            redirectLogin: true,
          })
        }
      })
      .catch(function(error) {console.log(error); alert(error);});
    //   .then(res => res.json())
    //   .then(res => {sessionStorage.setItem('jwt', (res.token))
    //   this.setState({redirectQuery: true});
    //   this.props.props.userHasAuthenticated(true, formData["email"])
    // })
    //   .catch(function(error) {console.log(error); alert(error);});
      // this.setState({
      //   redirectQuery: true
      // });
    }

  render() {
    if (this.state.redirectLogin === true) {
      return <Redirect to='/login' props={this.props}/>
    }
    return (
      <div className="usercomponents">
        <div className="name">
          <div className="first">
            First Name
            <comp.TextInput name="firstName"
                        placeholder={this.state.formControls.firstName.placeholder}
                        value={this.state.formControls.firstName.value}
                        onChange={this.changeHandler}
                        touched={this.state.formControls.firstName.touched}
                        valid={this.state.formControls.firstName.valid}
                        maxLength="36"
            />
          </div>
          <div className="last">
            Last Name
            <comp.TextInput name="lastName"
                        placeholder={this.state.formControls.lastName.placeholder}
                        value={this.state.formControls.lastName.value}
                        onChange={this.changeHandler}
                        touched={this.state.formControls.lastName.touched}
                        valid={this.state.formControls.lastName.valid}
                        maxLength="36"
            />
          </div>
        </div>
        <div className="component">
          Select Your Gender
          <comp.Select name="gender"
                    value={this.state.formControls.gender.value}
                    onChange={this.changeHandler}
                    options={this.state.formControls.gender.options}
                    touched={this.state.formControls.gender.touched}
                    valid={this.state.formControls.gender.valid}
          />
        </div>
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
        <div className="component">
          Purpose
          <comp.TextArea name="purpose"
                      placeholder={this.state.formControls.purpose.placeholder}
                      value={this.state.formControls.purpose.value}
                      onChange={this.changeHandler}
                      touched={this.state.formControls.purpose.touched}
                      valid={this.state.formControls.purpose.valid}
          />
        </div>

        <div className="submit">
          <button className="submitButton" onClick={this.formSubmitHandler}
                    disabled={!this.state.formIsValid}
          >
            Submit
          </button>
        </div>
      </div>

    );
  }
}
export default UserForm;
