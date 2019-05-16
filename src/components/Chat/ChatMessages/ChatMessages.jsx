import React, { Component } from "react";
import style from "./ChatMessages.module.scss";

// Components
import Message from "./Message/Message";

class ChatBox extends Component {
  render() {
    const { chats } = this.props;
    return (
      <div>
        {chats.map(chat => (
          <Message
            key={chat.id}
            username={chat.username}
            message={chat.message}
          />
        ))}
      </div>
    );
  }
}

export default ChatBox;
