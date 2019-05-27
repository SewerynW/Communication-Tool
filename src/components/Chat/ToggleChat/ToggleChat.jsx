import React from "react";
import style from "./ToggleChat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ToggleChat extends React.Component {
  state = {
    chatFeatureStatus: false
  };

  handlerClickIcons = () => {
    const chat = document.getElementById("chat");
    let style = this.state.chatFeatureStatus ? "none" : "flex";
    chat.style.display = style;
    console.log("chat zmiany", this.state.chatFeatureStatus);
    this.setState(() => ({
      chatFeatureStatus: !this.state.chatFeatureStatus
    }));
  };

  render() {
    const { chatStatus } = this.state;
    return (
      <div className={style.container}>
        <FontAwesomeIcon
          icon="comments"
          size="2x"
          onClick={this.handlerClickIcons}
        />
      </div>
    );
  }
}

export default ToggleChat;
