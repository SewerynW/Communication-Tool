import React, { Component } from "react";
import style from "./ChatBox.module.scss";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";

class ChatBox extends Component {
  render() {
    const { handleTextChange, text, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} className={style.input}>
          <Input
            onChange={handleTextChange}
            value={text}
            type="text"
            placeholder="chat here..."
            className={style.input}
            inputProps={{
              "aria-label": "Description"
            }}
          />
          <button type="submit" style={{ display: "none" }} />
        </form>
      </div>
    );
  }
}

ChatBox.propTypes = {
  handleTextChange: PropTypes.func,
  text: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default ChatBox;
