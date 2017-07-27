import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {  
    
    const messages = this.props.messages.map((message) => {
      // if(message.type === 'postNotification'){ 
      //   return (
      //     <div key={i} className='notification'>
      //       {
      //         `${message.prevName} changed their name to ${message.name}`
      //       }
      //     </div>
      //   )
      // } else {
        return <Message 
        key={message.id}
        user={message.username}
        content={message.content} /> 
    // }
  });

    // const notification = this.props.notifications;
    
    return (
      <main className="messages">
          { messages }
      </main>
    );
  }
}
export default MessageList;





