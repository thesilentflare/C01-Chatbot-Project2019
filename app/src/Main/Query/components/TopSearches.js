import React, {Component} from 'react'
import "./TopSearches.css"

const DUMMY_DATA = [
  {
    text: 'Where can I contact a manager?'
  },
  {
    text: 'What services do you offer?'
  },
  {
    text: "How can I join the team?"
  },{
    text: "How can I join the team?"
  },{
    text: "How can I join the team?"
  },
]

class TopSearches extends Component{
  constructor(props){
    super(props);
  }
  selectTopSearch = (text) =>{
    //console.log("function? "+this.props.sendTopSearch);
    this.props.sendTop(text);
  }
  componentDidMount(){

  }

  // Display the most frequently searched queries to sidebar
  render(){
    return(
      <div className="message-list overflow-auto" ref={el => { this.el = el; }}>
        {this.props.props.topSearches.map((message, index) =>{
          return(
            <button key={index} className={'container'} onClick={()=>this.selectTopSearch(message.text)}>
              <div className={"top z-depth-1"}>{message.text}</div>
            </button>
          )
        })}

      </div>
    );
  }
}

export default TopSearches;
