import React, { Component, Fragment } from "react";
import { NavLink, Redirect} from 'react-router-dom'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import './Navbar.css'

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleLogout = event => {
    try{
      this.props.props.userHasAuthenticated(false);
    }
    catch (e) {
      alert(e.message);
    }
  }

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logout = () => {
  sessionStorage.removeItem('jwt');
  this.props.props.userHasAuthenticated(false, "")
  this.props.props.history.push('/');
}

// Generate the header navigation bar for additional options per account
render() {
  //console.log("nav:" + this.props.isAdmin);
  return (

    <MDBNavbar dark expand="md" className="nav-bar">
      <MDBNavbarBrand>
        <NavLink to="/" className="navitem" {...this.props}><strong className="white-text">AskBaba</strong></NavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
      <MDBNavbarNav right>
        {this.props.props.isAuthenticated ?
          <MDBDropdown className="lefter">
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">{this.props.props.accountName}</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu  className="dropdown-menu-right">
                  {this.props.props.isAdmin ? <NavLink to="/admin" className="navitem" {...this.props}><MDBDropdownItem>Dashboard</MDBDropdownItem></NavLink>:<Fragment/>}
                  {this.props.props.isAuthenticated ? <MDBDropdownItem onClick={()=>this.logout()}>Logout</MDBDropdownItem>:<Fragment/>}
                </MDBDropdownMenu>
              </MDBDropdown>
          :<Fragment>
            <NavLink to="/login" className="navitem">
              <MDBNavItem>Login</MDBNavItem>
            </NavLink>
          </Fragment> }

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

export default Navbar;
