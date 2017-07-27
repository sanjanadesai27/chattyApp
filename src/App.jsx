import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  
  constructor(props){
    super(props);
    this.socket;
    this.state = {
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      notifications: ''
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
      const incomingData = JSON.parse(event.data);
      switch(incomingData.type) {
        case 'incomingMessage':
          const newMessage = incomingData;
          const newMessages = this.state.messages.concat(newMessage);
          this.setState({
            messages: newMessages
          });
          console.log(this.state.messages);
          break;
        case 'incomingNotification':
          console.log(this.state.currentUser.name);
          //handle user name update - must know previous username and new username
          // const oldName = this.state.currentUser.prevName;
          // const newName = this.state.currentUser.name;
          // this.state.notifications = `${oldName} changed their name to ${newName}`;
          break;
        // default: 
        //   throw new Error("Unknown event type" + event.data.type);
      }  
    }
  }
  
  onNewMessage(text) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name, 
      content: text
    };
    if(!this.state.currentUser.name){ 
      newMessage.username = 'Anonymous';
    }
    this.socket.send(JSON.stringify(newMessage)); 
  }
  
  updatedUsername(name){
    const updatedUsername = {
      type: 'postNotification',
      prevName: this.state.currentUser.name,
      name: name
    };
    if(!updatedUsername.prevName) { 
      updatedUsername.prevName = 'Anonymous';
    }
    this.setState({
      currentUser: updatedUsername,
      messages: this.state.messages.concat(updatedUsername)
    });
    this.socket.send(JSON.stringify(updatedUsername));
  }
  
  render() {
    return (
      <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} notifications={this.state.notifications} /> 
      <ChatBar updatedUsername={this.updatedUsername} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

export default App;
