import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Query from '../Query/Query'


class Guest extends Component {
  constructor(props){
    super(props);
    //console.log("guest: "+ this.props.accountName);
    //console.log("query: "+ this.props.isAuthenticated);
  }
  render(props) {
    return (
      <Query {...this.props}/>
    );
  }
}
export default Guest;
