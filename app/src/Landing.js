import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './css/Landing.css'


class Landing extends Component {
  render() {
    return (
      <div className="wrapper">
        <h1>Welcome to ChatBot</h1>
        <h2>Select an option below to begin</h2>

        <div className="nav">
          <ul>
            <li><button><NavLink to="/Guest">Use As Guest</NavLink></button></li>
            <li><button><NavLink to="/Login">Login</NavLink></button></li>
            <li><button><NavLink to="/Create">Create An Account</NavLink></button></li>
          </ul>
        </div>


      </div>


    );
  }
}
export default Landing;
