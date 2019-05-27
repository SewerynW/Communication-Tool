import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import style from "./Chat.module.scss";

// Redux
import { connect } from "react-redux";

// Components
import ChatBox from "./ChatBox/ChatBox";
import ChatMessages from "./ChatMessages/ChatMessages";

class Chat extends Component {
  state = {
    text: "",
    chats: []
  };

  componentDidMount() {
    const pusher = new Pusher("13b13be20c4a53363def", {
      cluster: "eu",
      forceTLS: true
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", data => {
      this.setState({ chats: [...this.state.chats, data] });
    });
  }

  handleTextChange = e => {
    const text = e.target.value;
    this.setState({ text });
  };

  handleSubmit = e => {
    e.preventDefault();
    const payload = {
      userId: this.props.userProfile.Id,
      name: this.props.userProfile.GivenName,
      lastName: this.props.userProfile.Name,
      photo: this.props.userProfile.Photo,
      message: this.state.text
    };
    axios.post("https://dream-chat.herokuapp.com/message", payload);
    this.setState(() => ({
      text: ""
    }));
  };

  render() {
    return (
      <div className={style.container} id="chat">
        <ChatMessages chats={this.state.chats} />
        <h2>Chat</h2>
        <ChatBox
          handleSubmit={this.handleSubmit}
          handleTextChange={this.handleTextChange}
          text={this.state.text}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.profileReducer,
  chatFeatureStatus: state.stateReducer.chatFeatureStatus
});

export default connect(
  mapStateToProps,
  null
)(Chat);
