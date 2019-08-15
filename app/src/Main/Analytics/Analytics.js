import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";


class Analytics extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect: false,
      analytics: null,
      faq: [],
      IBMUnanswered: [],
      IndexerUnanswered: [],
      /**
       * unanswer format is:
       * IBM: [{user, text, date}, ... ,{...}],
       * "Indexer" : [{user, text, date}, ... ,{...}]
       */
    }
  }
    componentDidMount(){
      this.getFaq();
      this.getUnanswered();
    }
    redirect(e){
      this.setState({redirect: true});
    }

    getFaq = () => {
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
          faq: [...this.state.faq, {question: data[i].name, answer: data[i].text}],
        })
        console.log(data[i].name);
      }

      })
      .catch(function(error) {console.log(error)});
    }

    /**
   * sends query to backend
   */
  getUnanswered = () => {
    var url = 'http://localhost:4000/unanswered';
    fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())//response.json())
    .then(data => {
      for (var i = 0; i < data.IBM.length; i++) {
        this.setState({
        IBMUnanswered: [...this.state.IBMUnanswered,{user: data.IBM[i].user, text: data.IBM[i].text, date: data.IBM[i].date}],
        })
      }
      for (var i = 0; i < data.Indexer.length; i++) {
        this.setState({
        IndexerUnanswered: [...this.state.IndexerUnanswered,{user: data.Indexer[i].user, text: data.Indexer[i].text, date: data.Indexer[i].date}],
      })
    }
    })
    .catch(function(error) {console.log(error)});

    console.log("hello");

  }

  faqLoad = () =>{
    return (
      <div className="message-list overflow-auto" ref={el => { this.el = el; }}>
        <h1 className="faqTitle">Frequently Asked Questions</h1>
        {this.state.faq.map((faq, index) =>{
          return(
            <div key={index} className="faqcont">
            <div className={"faq1"}>Question: {faq.question}</div>
              <div className={"faq2"}>Answer: {faq.answer}</div>
            </div>
          )
        })}

      </div>
    )
  }

  ibmLoad = () =>{
    return (
      <div className="message-list overflow-auto" ref={el => { this.el = el; }}>
        <h1 className="IBMUnanswered">IBM Watson Unanswered Questions</h1>
        {this.state.IBMUnanswered.map((ibm, index) =>{
          return(
            <div key={index} className="IBMcont">
            <div className={"ibm1"}>User:{ibm.user}</div>
              <div className={"ibm2"}>Question:{ibm.text}</div>
              <div className={"ibm3"}>Date:{ibm.date}</div>
            </div>
          )
        })}

      </div>
    )
  }


  indexerLoad = () =>{
    return (
      <div className="message-list overflow-auto" ref={el => { this.el = el; }}>
        <h1 className="indexerUnanswered">Lucene Indexer Unanswered Questions</h1>
        {this.state.IndexerUnanswered.map((indexer, index) =>{
          return(
            <div key={index} className="Indexercont">
            <div className={"index1"}>User: {indexer.user}</div>
              <div className={"index2"}>Question: {indexer.text}</div>
              <div className={"index3"}>Date: {indexer.date}</div>
            </div>
          )
        })}

      </div>
    )
  }

  render(props) {
    if (this.state.redirect === true){
      return <Redirect to='/' {...this.props}/>
    }
    return (
      <div>
      ANALYTICS PAGE
      <div><button className="z-depth-1" onClick={(e)=>this.redirect(e)}>Return to Main Menu</button></div>
      {/*DISPLAY ANALYTICS HERE*/}

      <MDBJumbotron className="">
      {this.faqLoad()}

      </MDBJumbotron>

      <MDBJumbotron className="">
        {this.ibmLoad()}
      </MDBJumbotron>

      <MDBJumbotron className="">
        {this.indexerLoad()}
      </MDBJumbotron>

      </div>
    );
  }
}
export default Analytics;
