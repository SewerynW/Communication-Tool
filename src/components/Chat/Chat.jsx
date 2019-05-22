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
    username: "",
    chats: []
  };

  componentDidMount() {
    const username = window.prompt("Username: ", "Anonymous");
    this.setState({ username });
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
    console.log("wpisuje", text);
    this.setState({ text });

    // if (e.keyCode === 13) {
    //   console.log("ładuje wiadomość");
    //   const payload = {
    //     username: this.state.username,
    //     message: this.state.text
    //   };
    //   axios.post("http://localhost:5000/message", payload);
    // } else {
    //   this.setState({ text });
    // }
  };

  handleSubmit = e => {
    e.preventDefault();
    const payload = {
      username: this.state.username,
      message: this.state.text
    };
    console.log("wysyłam", payload);
    axios.post("https://dream-chat.herokuapp.com//message", payload);
    // axios.post("http://localhost:5000/message", payload);
  };

  render() {
    return (
      <div>
        Chat
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
