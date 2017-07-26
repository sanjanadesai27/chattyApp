import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 0,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 1,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }
  
  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  
  onNewMessage(text) {
    const newMessage = {
      username: this.state.currentUser.name, 
      id: Math.random(),
      content: text
    };
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({
      messages: newMessages
    });
  }

  render() {
    return (
      <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}  /> 
      <ChatBar currentUser={this.state.currentUser} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

export default App;
