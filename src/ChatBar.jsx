import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
        defaultValue={'Anonymous'}
        onKeyDown={(event)=> {
          if(event.key === 'Enter'){
            this.props.updatedUsername(event.target.value);
          }
        }}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
          onKeyDown={(event) => {
            if(event.key === 'Enter') { 
              this.props.onNewMessage(event.target.value);
              event.target.value = '';
            }
          }} />
      </footer>
    );
  }
}
export default ChatBar;


