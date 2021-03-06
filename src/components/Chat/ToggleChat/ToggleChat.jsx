import React from "react";
import style from "./ToggleChat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Redux
import { connect } from "react-redux";
import { toggleChat } from "../../../actions/stateActions";

class ToggleChat extends React.Component {
  componentDidMount() {
    this.toggleChatStyle("flex", "none");
  }
  handlerClickIcons = () => {
    this.toggleChatStyle("none", "flex");
    this.notificationStatus();
    this.props.toggleChat();
  };

  notificationStatus = () => {
    const chatIcon = document.getElementById("chatIcon");
    chatIcon.style.backgroundColor = "white";
  };

  toggleChatStyle = (parm1, parm2) => {
    const chat = document.getElementById("chat");
    let style = this.props.chatFeatureStatus ? parm1 : parm2;
    chat.style.display = style;
  };

  render() {
    return (
      <div className={style.container} id="chatIcon">
        <FontAwesomeIcon
          icon="comments"
          size="2x"
          onClick={this.handlerClickIcons}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatFeatureStatus: state.stateReducer.chatFeatureStatus
});

const mapDispatchToProps = dispatch => {
  return {
    toggleChat: () => {
      dispatch(toggleChat());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleChat);
