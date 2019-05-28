import React from "react";
import style from "./FontAwesomeButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FontAwesomeButton = props => {
  return (
    <button
      className={`${style.awesomeButton} ${props.colorButton || style.yellow}`}
      onClick={props.handleOnClick || (() => alert("Oops! Some goes wrong!"))}
    >
      <FontAwesomeIcon icon={props.icon || "exclamation-triangle"} />
    </button>
  );
};

export default FontAwesomeButton;
