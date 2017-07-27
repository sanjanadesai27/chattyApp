import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  
  constructor(props){
    super(props);
    this.socket;
    this.state = {
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.updatedUsername = this.updatedUsername.bind(this);
  }
  
  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onopen = function(event){ 
      console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      console.log(event.data);
      //const newUsername = (JSON.parse(event.data)).name;
      const newMessage = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(newMessage);
      this.setState({
        //currentUser : newUsername,
        messages: newMessages
      });
    }
  }
  
  onNewMessage(text) {
    const newMessage = {
      username: this.state.currentUser.name, 
      content: text
    };
    this.socket.send(JSON.stringify(newMessage)); 
  }

  updatedUsername(name){
    const updatedUsername = {
      name: name
    };
    this.setState({
      currentUser: updatedUsername
    });
    this.socket.send(JSON.stringify(updatedUsername));
  }
  
  render() {
    return (
      <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}  /> 
      <ChatBar updatedUsername={this.updatedUsername} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

export default App;
