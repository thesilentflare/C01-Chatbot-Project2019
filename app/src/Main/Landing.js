import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Landing.css'


class Landing extends Component {
  render() {
    return (
      <div className="wrapper">
        <h1>Welcome to ChatBot</h1>
        <h2>Select an option below to begin</h2>

        <div className="nav">
          <ul>
            <li><NavLink to="/Guest"><button>Proceed As Guest</button></NavLink></li>
            <li><NavLink to="/Login"><button>Login</button></NavLink></li>
            <li><NavLink to="/Create"><button>Create An Account</button></NavLink></li>
          </ul>
        </div>


      </div>


    );
  }
}
export default Landing;
