import React from "react";

const Message = props => {
  return (
    <div>
      <p>{props.username}</p>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
