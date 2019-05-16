import React from "react";
import style from "./Navigation.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navigation = props => {
  return (
    <div className={style.headerLinks}>
      <Link to="/dashboard" className={style.link}>
        #home page
      </Link>
      <Link to="/profilePage" className={style.link}>
        #profile page
      </Link>
      <p onClick={props.logoutAndClearSession} className={style.link}>
        #log out
      </p>
      <Link to="/chat" className={style.link}>
        #chat
      </Link>
    </div>
  );
};

Navigation.propTypes = {
  logoutAndClearSession: PropTypes.func
};

export default Navigation;
