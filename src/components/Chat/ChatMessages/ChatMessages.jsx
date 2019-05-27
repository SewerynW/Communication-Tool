import React, { Component } from "react";
import style from "./ChatMessages.module.scss";

// Components
import Message from "./Message/Message";
import { checkPropTypes } from "prop-types";

class ChatBox extends Component {
  render() {
    const { chats } = this.props;
    return (
      <div>
        {chats.map((chat, key) => (
          <Message
            key={key}
            name={chat.name}
            lastName={chat.lastName}
            message={chat.message}
            userId={chat.userId}
            photo={chat.photo}
          />
        ))}
      </div>
    );
  }
}

export default ChatBox;
