import React from "react";
import { Avatar } from "@material-ui/core";
import style from "./Message.module.scss";

class Message extends React.Component {
  render() {
    const { name, lastName, message, photo } = this.props;
    return (
      <div className={style.container}>
        <div className={style.user}>
          <Avatar alt="Avatar" src={photo} />
          <p> {`${name} ${lastName}`}</p>
        </div>

        <p> {message} </p>
      </div>
    );
  }
}

export default Message;
