import React, {Component} from 'react';

class Message extends Component {
  render() {
    if(this.props.type === 'incomingMessage') {
      return (
        <div className="message">
          <span className="message-username">{ this.props.user }</span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      )
    } else if(this.props.type === 'incomingNotification'){
      return (
        <div className="message system">
          {this.props.content}
        </div>
      )
    } else { 
      return (
        <div>
          <span className="message-username">{ this.props.user }</span>
          <span className='message-image'><img src={this.props.content} /></span>
        </div>
      )
    }
  }
}
export default Message;

