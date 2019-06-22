import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import * as form from './Forms'

class CreateAcc extends Component {
  constructor(){
    super();
    this.state = {
      acctype: "User",
      showuser: true,
      showadmin: false
    }
  }

  changeForm = event =>{
    var value = event.target.value;

    if (value === "Admin"){
      this.setState({
        acctype: "Admin",
        showuser: false,
        showadmin: true
      });
    }
    else{
      this.setState({
        acctype: "User",
        showuser: true,
        showadmin: false
      });
    }
  }



  render() {
    return (
      <div className="">
        Create Account Page

        <select className="acctype" onChange={this.changeForm} value={this.state.acctype}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>


        <div className="form">
          { this.state.showuser ? <form.UserForm /> : null }
          { this.state.showadmin ? <form.AdminForm /> : null }
        </div>
      </div>
    );
  }
}
export default CreateAcc;
