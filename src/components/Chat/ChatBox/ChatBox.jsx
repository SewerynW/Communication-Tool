import React, { Component } from "react";
import style from "./ChatBox.module.scss";

class ChatBox extends Component {
  render() {
    const { handleTextChange, text } = this.props;
    return (
      <div className="">
        <input
          type="text"
          value={text}
          placeholder="chat here..."
          className=""
          onChange={handleTextChange}
        />
      </div>
    );
  }
}

export default ChatBox;
