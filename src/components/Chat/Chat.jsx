import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import style from "./Chat.module.scss";

// Components
import ChatBox from "./ChatBox/ChatBox";
import ChatMessages from "./ChatMessages/ChatMessages";

class Chat extends Component {
  state = {
    text: "",
    username: "sewww",
    chats: []
  };

  componentDidMount() {
    // const username = window.prompt("Username: ", "Anonymous");
    // this.setState({ username });
    const pusher = new Pusher("13b13be20c4a53363def", {
      cluster: "eu",
      forceTLS: true
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", data => {
      this.setState({ chats: [...this.state.chats, data], test: "" });
    });
  }

  handleTextChange = e => {
    const text = e.target.value;
    const payload = {
      username: this.state.username,
      message: this.state.text
    };
    this.setState({ text });
  };

  handleSubmit = e => {
    e.preventDefault();
    const payload = {
      username: this.state.username,
      message: this.state.text
    };
    axios.post("https://dream-chat.herokuapp.com/message", payload);
    // axios.post("http://localhost:5000/message", payload);
  };

  render() {
    return (
      <div className={style.container} id="chat">
        <h2>Chat</h2>
        <ChatBox
          handleSubmit={this.handleSubmit}
          handleTextChange={this.handleTextChange}
          text={this.state.text}
        />
        <ChatMessages chats={this.state.chats} />
      </div>
    );
  }
}

export default Chat;
