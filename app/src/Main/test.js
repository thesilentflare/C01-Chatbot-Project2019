import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: []
    };
  }
  componentDidMount() {
    fetch('http://localhost:6060/test', {
      method: "POST",
    }
    ) //mask the backend somewhere else
    .then(response => response.json())//response.json())
    .then(data => this.setState({users: data.users }))
    .catch(function(error) {console.log(error)});
  }

  showUsers(user) {
    return <div> {user.firstName} </div>
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        {users.map(this.showUsers)}
      </div>
    );
  }
}

export default Test;
