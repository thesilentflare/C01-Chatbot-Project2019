import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Landing.css'
import { Navbar } from './Header'


class Landing extends Component {
  constructor(props){
    super(props);
  }

  // Main Menu Page
  render() {
    return (
      <div className="wrapper">
        <Navbar props={this.props}/>
        <h1>Welcome to AskBaba</h1>
        <h2>Select an option below to begin</h2>

        <div className="nav">
          <ul>
            <li><NavLink to="/guest" props={this.props}><button>Proceed As Guest</button></NavLink></li>
            <li><NavLink to="/login" props={this.props}><button>Login</button></NavLink></li>
            <li><NavLink to="/create" props={this.props}><button>Create An Account</button></NavLink></li>
            <li><NavLink to="/analytics" props={this.props}><button>Analytics</button></NavLink></li>
          </ul>
        </div>


      </div>


    );
  }
}
export default Landing;
