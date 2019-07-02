import React, { Component } from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import * as comp from './components'

class Query extends Component {
  constructor(props){
    super(props);
    this.state = {
      formIsValid: false,
      toggleIBM: true,
      formControls:{
        searchbar: {
          value: '',
          placeholder: 'ask here',
          valid: false,
          validationRules: {
            isRequired: true,
            minLength: 1,
          },
          touched: false
        },
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
      // sent to message logging pool?
    }

    //clear input field
    this.setState({
      formControls:{
        searchbar:{
          value: '',
          placeholder: 'ask here'
        }
      }
    })
  }

  toggleIBM = () =>{
    alert(this.state.toggleIBM);
    console.log("clicked");
    this.setState(prevState =>({
      toggleIBM: !prevState.toggleIBM
    }));
  }


  render(){
    return(
      <div className="">
      Query
      <comp.SearchBar name="searchbar"
        placeholder={this.state.formControls.searchbar.placeholder}
        value={this.state.formControls.searchbar.value}
        onChange={this.changeHandler}
        touched={this.state.formControls.searchbar.touched}
        valid={this.state.formControls.searchbar.valid}
      />
      <button onClick={this.formSubmitHandler}
                disabled={! this.state.formIsValid}
      >
        Send
      </button>
      <comp.Slider onClick={this.toggleIBM} checked={this.state.toggleIBM}

        />
      {/* use following to show ibm results*/}
      { this.state.toggleIBM ?
        <div>
        SHOWING IBM STUFF

        </div> : null }
      </div>
    );
  }
}
export default Query;
