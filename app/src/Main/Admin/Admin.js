import React, { Component, Fragment } from "react";
import { NavLink, Redirect} from 'react-router-dom';
import {Navbar} from '../Header';
import Upload from '../Upload/Upload';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './Admin.css';

class Admin extends Component{
  constructor(props){
    super(props);
    this.state={
      redirect: false,
      changed: null,
    }

  }
  redirect(e){
    this.setState({redirect: true});
  }
  handleUrlDepth(e){
    e.preventDefault();
    /// SEND


  }

  // Successful admin login, redirect to main query page
  render(){
    if (this.state.redirect === true){
      return <Redirect to='/query' {...this.props}/>
    }
    if (this.state.changed === true){
      alert("URL and Depth Changed Succesfully");
      this.setState({
        file: "",
        changed: false,
      });
      this.fileInput.value = "";
    }
    else if (this.state.changed === false){
      alert("Error! Failed to Change URL and Depth");
      this.setState({
        file: "",
        changed: null,
      });
    }
    return(
      <div className="">
      <Navbar props={this.props} isAuthenticated={this.props.isAuthenticated}/>
        ADMINPAGE
        <MDBJumbotron className="jumbotron1">
          <h5>Upload Files</h5>
          <Upload/>
        </MDBJumbotron>

        <MDBJumbotron className="jumbotron1">
          <h5>Change URL</h5>

          <form className="form">
            <div className="crawler">
              <div className="url">
                URL
                <input type="text" name="url" className="pickfile z-depth-1" ref={ref=> this.urlInput = ref}/>
              </div>
              <div className="depth">
                Depth
                <input type="text" name="url" className="pickfile z-depth-1" ref={ref=> this.depthInput = ref}/>
              </div>
            </div>
            <button className="z-depth-1" onClick={(e)=>this.handleUrlDepth(e)}>Change URL and Depth</button>
          </form>
        </MDBJumbotron>

        <div>
          <button className="z-depth-1" onClick={(e)=>this.redirect(e)}>Return to Query</button>
        </div>
      </div>
    );
  }

}
export default Admin;
