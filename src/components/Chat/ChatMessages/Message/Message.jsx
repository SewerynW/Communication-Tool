import React from "react";
import { Avatar } from "@material-ui/core";
import style from "./Message.module.scss";
import PropTypes from "prop-types";

class Message extends React.Component {
  render() {
    const { name, lastName, message, photo } = this.props;
    return (
      <div className={style.container}>
        <Avatar alt="Avatar" src={photo} />
        <div className={style.message}>
          <p className={style.user}> {`${name} ${lastName}`}</p>
          <p> {message} </p>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  name: PropTypes.string,
  lastName: PropTypes.string,
  message: PropTypes.string,
  photo: PropTypes.string
};

export default Message;
