import React, { Component } from "react";
import style from "./ChatMessages.module.scss";
import PropTypes from "prop-types";

// Components
import Message from "./Message/Message";

class ChatMessages extends Component {
  render() {
    const { chats } = this.props;
    return (
      <div className={style.container}>
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

ChatMessages.propTypes = {
  chats: PropTypes.array
};

export default ChatMessages;
