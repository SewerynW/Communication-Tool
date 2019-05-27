import React, { Component } from "react";
import style from "./ChatBox.module.scss";

class ChatBox extends Component {
  render() {
    const { handleTextChange, text, handleSubmit } = this.props;
    return (
      <div className="">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            placeholder="chat here..."
            className=""
            onChange={handleTextChange}
          />
          <button type="submit" style={{ display: "none" }} />
        </form>
      </div>
    );
  }
}

export default ChatBox;
