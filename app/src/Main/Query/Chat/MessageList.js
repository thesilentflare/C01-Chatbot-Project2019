import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './MessageList.css'

const DUMMY_DATA = [
  {
    senderID: 'Bot',
    text: 'Hey'
  },
  {
    senderID: 'Bot',
    text: 'How may I help you today?'
  },
  {
    senderID: 'John',
    text: "hfeiosahfo weahio w <a href=\"google.ca\"/>"
  },
]

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state ={
      lastSender: "Baba",
      isFirst: true,
      date: "",
    }
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: "nearest" });
  }

  notFirst = (sender) =>{
    console.log("hereerererer");
    if (!this.isFirst){
      if (!sender == 'Baba'){
        this.setState({
          lastSender: sender,
          isFirst: true,
        });
      }
    }
  }

  // Display the content of the main chat screen
  render(){
    return(
      <div className="message-list overflow-auto" ref={el => { this.el = el; }}>
        {this.props.props.messages.map((message, index) =>{
          return(
            <div key={index} className={'message '+ message.senderID}>
              {this.state.isFirst ? <div className={"sender " + message.senderID}>{message.senderID}</div>: null}
              <div className={"msg z-depth-1 msg" + message.senderID} dangerouslySetInnerHTML={{__html: message.text}}></div>
              <div className={"date "+ message.senderID}>{message.date}</div>
            </div>
          )
        })}

      </div>
    );
  }
}
export default MessageList
