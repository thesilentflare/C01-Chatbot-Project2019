import React, { Component } from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import * as comp from './components'
import {Navbar} from '../Header'
import './Query.css'
import * as chat from './Chat'

class Query extends Component {
  constructor(props){
    super(props);
    // console.log("query: "+ this.props.isAuthenticated);
    // console.log("account: "+ this.props.accountName);
    var date = new Date();

    this.state = {
      userID: this.props.accountName,
      messages: [{senderID: "Baba", text: 'Hello my name is Baba, How may I help you today?', date: date.toString()}],
      topSearches: [],
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
      if (this.props.isAuthenticated){
        this.changeName();
      }
      //console.log("userid " + this.state.userID);
    }


    componentDidMount(){
      const chatroom = new chat.Chatroom();
      const limit = {"limit":5};
      fetch("http://localhost:4000/faq", {
        method: "POST",
        body: JSON.stringify(limit),
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => response.json())//response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          this.setState({
          formIsValid: false,
          topSearches: [...this.state.topSearches,{text: data[i].name}],
        })
        //console.log(data[i].name);
      }

      })
      .catch(function(error) {console.log(error)});
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

  /**
   * sends query to backend
   */
  sendQuery = (query, user, date) => {
    var url = 'http://localhost:4000/watson';
    if (this.state.toggleIBM == true) {
      url = 'http://localhost:4000/watson';
    } else {
      url = 'http://localhost:4000/query';
    }
    query =
    {
      "text": query,
      "user": user
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())//response.json())
    .then(data => this.setState({
      formIsValid: false,
      messages: [...this.state.messages, {senderID: "Baba", text: data.text, date: date.toString()}],
      formControls:{
        searchbar: {
          value: '',
          placeholder: 'ask here',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          }
        },
      }
    }))
    .catch(function(error) {console.log(error)});

    //console.log("hello");

  }

  formSubmitHandler = () => {
  	const formData = {}; //All data stored as dictionary
  	for (let formElementId in this.state.formControls) {
  	    formData[formElementId] = this.state.formControls[formElementId].value;
  	}
    for (var data in formData){
      //alert(formData[data]); //testing each value sent
      // sent to message logging pool?
    }
    const message = formData['searchbar'];
    //console.log(this.state.messages);
    var date = new Date();

    //clear input field
    this.setState({
      formIsValid: false,
      messages: [...this.state.messages, {senderID: this.state.userID, text: message, date: date.toString()}],
      formControls:{
        searchbar: {
          value: '',
          placeholder: 'ask here',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          }
        },
      }
    })

    this.sendQuery(message, this.state.userID, date);

  }
  toggleIBM = () =>{
    // alert(this.state.toggleIBM);
    //console.log("clicked");
    this.setState(prevState =>({
      toggleIBM: !prevState.toggleIBM
    }));
  }

  sendTopSearch = (text)=>{
    var date = new Date();
    this.setState({
      formIsValid: false,
      messages: [...this.state.messages, {senderID: this.state.userID, text: text, date: date.toString()}],
      formControls:{
        searchbar: {
          value: '',
          placeholder: 'ask here',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          }
        },
      }
    })
    //send data

    this.sendQuery(text, this.state.userID, date);
  }
  changeName = () =>{
    this.setState({
      userID: this.props.accountName
    })
  }

  render(){
    // console.log("second "+ this.props.isAuthenticated);
    // console.log("data:" + this.props.userData);
    if (this.state.userID === undefined){
      this.setState({
        userID: "Guest"
      })
    }
    return(
      <div className="wrapper">
        <Navbar props={this.props} isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin}/>
        <div className="content">
          <div className="chatcomp">
            <div className="message-area">
              <chat.MessageList props={this.state}/>
            </div>
            <form onSubmit={this.formSubmitHandler} className="queryarea">
              <div className="inner">
                <div className="searchbar">
                  <div className="searchcomps">
                    <comp.SearchBar name="searchbar" className="search"
                      placeholder={this.state.formControls.searchbar.placeholder}
                      value={this.state.formControls.searchbar.value}
                      onChange={this.changeHandler}
                      touched={this.state.formControls.searchbar.touched}
                      valid={this.state.formControls.searchbar.valid}
                    />

                    <button onClick={this.formSubmitHandler}
                              disabled={! this.state.formIsValid}
                              className="send"
                    >
                      <img src={"/send.png"} className="buttonImage"/>
                    </button>
                  </div>

                  <comp.Slider onClick={this.toggleIBM}
                            defaultChecked={this.state.toggleIBM}

                  />
                </div>
              </div>
              {/* use following to show ibm results*/}
              {/*{ this.state.toggleIBM ?
              <div>
              SHOWING IBM STUFF

              </div> : null }*/}
            </form>
          </div>
          <div className="topsearchcomp">
            <h4>TOP SEARCHES</h4>
            <div className="topsearchelements" >
            <comp.TopSearches sendTop={this.sendTopSearch.bind(this)} props={this.state}/>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Query;
