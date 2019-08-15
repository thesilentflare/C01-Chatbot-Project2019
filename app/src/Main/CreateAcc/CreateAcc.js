import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import * as form from './Forms'

class CreateAcc extends Component {
  constructor(props){
    super(props);
    this.state = {
      acctype: "User",
      showuser: true,
      showadmin: false,
      redirectMain: false,
    }
    // this.redirecting = this.redirecting.bind(this);
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

  redirecting = () => {
    this.setState({ redirectMain: true
    });
  }

  // Display the account registration form based on account type selected: User/Admin
  render() {
    if (this.state.redirectMain === true){
      return <Redirect to='/' props={this.props}/>
    }
    return (
      <div className="mainpage">
        Create Account Page
        <div className="back">

        </div>

        <div className="acctype">
          <text>Select Your Account Type: </text>

          <select className="accselect" onChange={this.changeForm} value={this.state.acctype}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        
        <div className="form">
          { this.state.showuser ? <form.UserForm props={this.state}/> : null }
          { this.state.showadmin ? <form.AdminForm props={this.state}/> : null }
        </div>
        <div className="back">
          <button onClick={()=>this.redirecting()}>Back to Main Page</button>
        </div>
      </div>
    );
  }
}
export default CreateAcc;
