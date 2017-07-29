import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  
  constructor(props){
    super(props);
    this.socket;
    this.state = {
      numUsers : 0,
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
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
      if(typeof JSON.parse(event.data) === 'number') {
        this.setState({
          numUsers: JSON.parse(event.data)
        });
      } else { 
        const incomingData = JSON.parse(event.data);
        switch(incomingData.type) {
          case 'incomingMessage':
            const newMessage = incomingData;
            const newMessages = this.state.messages.concat(newMessage);
            this.setState({
              messages: newMessages
            });
            break;
          case 'incomingNotification':
            const notification = incomingData;
            const newNotifications = this.state.messages.concat(notification);
            this.setState({
              messages: newNotifications
            });
            break;
          case 'incomingImage': 
            const image = incomingData;
            const newImages = this.state.messages.concat(image);
            this.setState({
              messages: newImages
            });
          // default: 
          //   throw new Error('Unknown event type' + incomingData.type);
        }
      }  
    }
  }
  
  onNewMessage(text) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name, 
      content: text
    };
    this.socket.send(JSON.stringify(newMessage)); 
  }
  
  updatedUsername(name){
    const updatedUsername = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${name}`,
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
          <span className='userCounter'>users online: {this.state.numUsers}</span>  
          <a href="/" className="navbar-brand">Chatty 🍑</a>
        </nav>
        <MessageList messages={this.state.messages} /> 
        <ChatBar updatedUsername={this.updatedUsername} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

export default App;
